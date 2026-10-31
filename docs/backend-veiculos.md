# Backend de veículos — modelo e validações

Etapas 3–4, 31/10/2026. Responsável: Rafael Duarte Yahata.

Este módulo define persistência, validação e serviços. **Ainda não registra rotas HTTP
de veículos**, não migra a seed nem altera o frontend. O banco Atlas compartilhado
não recebe dados ou índices por esta entrega; os testes usam MongoDB temporário.

## Arquivos e interfaces para a equipe

| Arquivo em `backend/src/modules/vehicles/` | Interface |
| --- | --- |
| `model.js` | `Vehicle`, modelo Mongoose na conexão padrão, coleção `vehicles` |
| `schemas.js` | `createVehicleSchema(currentYear?)` para o corpo de cadastro |
| `schemas.js` | `createVehicleUpdateSchema(currentKm, currentYear?)` para edição completa |
| `schemas.js` | `createOdometerSchema(currentKm)` para atualização exclusiva de km |
| `schemas.js` | `deactivateVehicleSchema` para `{ active: false }` |
| `rules.js` | Normalização de placa, formato, ano de São Paulo e regras de números |
| `repository.js` | `vehicleRepository`: consultas com proprietário, criação e atualizações atômicas |
| `service.js` | `vehicleService`: `list`, `get`, `create`, `update`, `updateOdometer`, `deactivate` |

Todos os serviços recebem `ownerId` texto como primeiro argumento. Os comandos
individuais recebem o ID do veículo em seguida; criação/alterações recebem o
corpo JSON como último argumento. `ownerId` deve vir da autenticação. As listas
incluem veículos inativos do próprio usuário, necessários para histórico.

Os serviços lançam `HttpError` (`backend/src/errors.js`) com `status`, `code`,
`message` e `fields` opcional. ID malformado retorna 400; identidade inválida,
401; veículo alheio, 403; inexistente, 404; placa duplicada ou conflito, 409.
O middleware HTTP ainda deverá tratar essa classe de erro na etapa das rotas.

Edição completa usa versão (`__v`) e limite de km na condição da escrita; aumento
de km usa condição `$lt`. Todas as alterações incrementam a versão, e apenas
veículos ativos são alterados. Assim uma leitura antiga não desfaz um aumento
ou uma inativação já confirmados. Inativação repetida é idempotente.

Os schemas são Zod e suportam `safeParse`. A validação no servidor recebe o JSON
já convertido pelo frontend: ano e quilometragem devem ser números. Strings
numéricas, vazio, `null`, booleanos e operadores MongoDB são recusados.

Exemplo de entrada de cadastro ou edição completa:

```json
{
  "plate": "ABC-1234",
  "model": "Onix 1.0",
  "year": 2022,
  "currentKm": 22000
}
```

Exemplo de integração futura, sem adicionar identidade a partir do corpo:

```js
import { Vehicle } from "./model.js";
import { createVehicleSchema } from "./schemas.js";

const result = createVehicleSchema().safeParse(req.body);
// Em caso de falha, a camada HTTP deverá responder 400 com erros por campo.
// Só após validar autenticação e o corpo:
if (result.success) {
  const vehicle = await Vehicle.create({ ...result.data, ownerId: req.user.id });
  res.status(201).json(vehicle);
}
```

O trecho ilustra uso das interfaces; não é um handler completo e não está
registrado na aplicação. O formato de `req.user` deve ser alinhado com Rafael
Voigt antes das rotas. O `ownerId` requer um ObjectId válido; a existência e a
identidade do usuário são responsabilidades da autenticação, não do schema do veículo.

## Regras preservadas

- Placas antigas e Mercosul são aceitas. Espaços/hífens são removidos e letras
  ficam maiúsculas. Outros símbolos não são removidos para contornar validação.
- Modelo é obrigatório, com espaços externos removidos.
- Ano inteiro entre 1886 e o próximo ano; o limite padrão usa `America/Sao_Paulo`
  e é calculado a cada validação, sem ficar congelado na inicialização do processo.
- Quilometragem inteira, não negativa e dentro do intervalo seguro do JavaScript.
- Cadastro nasce com `active: true` no modelo. O corpo não escolhe ativação.
- Edição completa permite manter ou aumentar o odômetro. Atualização específica
  exige aumento. Inativação só aceita `active: false`, sem reativação/patch misto.
- Cadastro/edição recusam campos extras, incluindo `id`, `_id`, `ownerId`, `donoId`,
  `active` e operadores como `$set`. Não repassar o corpo bruto ao Mongoose.

## Persistência e índice

O modelo inclui `ownerId` obrigatório e imutável, placa normalizada, modelo, ano,
km e ativação. Também valida formato e valores ao salvar um documento Mongoose.
O casting de tipos do Mongoose não substitui a validação Zod da entrada HTTP.

O índice `unique_vehicle_plate` protege a placa globalmente, inclusive entre
usuários diferentes e para veículos inativos. Isso preserva a regra anterior.
A proteção é do MongoDB: duas inserções simultâneas não podem gravar a mesma
placa. `unique` não gera `ValidationError`; a duplicidade retorna código `11000`.

O serviço traduz esse código para `HttpError` 409 com mensagem genérica e erro
do campo `plate`, sem revelar o proprietário existente. Erros imprevistos do
driver não são publicados; a futura camada HTTP deve tratá-los como 500 genérico.

Antes de disponibilizar as rotas, aguardar `Vehicle.init()` para confirmar a
criação dos índices. Não usar `syncIndexes`, apagar índices ou resetar o Atlas
compartilhado automaticamente. Dados legados duplicados exigem migração explícita.

## JSON público e proprietário

`res.json(vehicle)` / `vehicle.toJSON()` produzem exclusivamente:

```json
{
  "id": "OBJECTID_COMO_TEXTO",
  "plate": "ABC1234",
  "model": "Onix 1.0",
  "year": 2022,
  "currentKm": 22000,
  "active": true
}
```

`_id`, `__v` e `ownerId` não são publicados. `ownerId` também fica fora da seleção
padrão; código interno que precise lê-lo deve usar `.select("+ownerId")`. Isso
não substitui o filtro de autorização na consulta. Não devolver resultados
`lean()` diretamente: eles não executam a transformação `toJSON` do modelo.

As futuras consultas devem filtrar pelo proprietário autenticado. Para a política
403/404 da aula 11, uma eventual consulta interna de existência deve ser mínima e
nunca devolver o documento alheio. Nenhuma autorização é oferecida só por importar
o modelo ou validar o corpo.

## Próximo incremento: repositório e rotas protegidas

1. Alinhar `req.user.id` e middleware JWT com a frente de autenticação.
2. Criar rotas/serviços e responder erros no contrato compartilhado.
3. Reutilizar os serviços e suas condições atômicas. Um `findByIdAndUpdate` genérico
   pode sobrescrever km nova com leitura antiga, mesmo com `runValidators: true`.
4. Preservar os comandos separados de edição, odômetro e inativação.
5. Verificar isolamento com dois usuários em chamadas HTTP reais.
6. Migrar seed e integrar frontend somente em incrementos posteriores.

## Verificação desta etapa

```bash
npm ci
npm run test:backend
npm test
```

Há testes de schemas, limites de ano/km, identidade indevida e formatos de PATCH.
No MongoDB real temporário são verificados JSON público, campos inválidos,
proprietário imutável, inativação e unicidade sob inserções simultâneas.
Eles não usam `MONGO_URL` do ambiente e não precisam do Atlas.

Referências: [validação Mongoose](https://mongoosejs.com/docs/validation.html),
[schemas Mongoose](https://mongoosejs.com/docs/guide.html) e
[schemas Zod](https://zod.dev/api).
