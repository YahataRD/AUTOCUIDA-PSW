# Contrato da base compartilhada

Atualizado em 04/10/2026: a integração atual usa json-server e TanStack Query.
Consulte [integração e validação](testes/integracao-mock.md) e o README para executar.
A seed fica em `mock/seed.json`; `mock/db.json` é a cópia persistente local.
Os comandos do hook agora retornam Promises e devem ser aguardados com `await`.
`src/data/api.js` centraliza HTTP e regras; `src/data/queries.js` mantém o cache.
As telas recebem `isSaving` para bloquear envios concorrentes. Falhas preservam
os campos; novas consultas atualizam os dados, inclusive após falha parcial.
Adicionar futuras operações nesses módulos, reutilizando as validações e seletores.
O reducer continua atendendo apenas o adaptador demo e os testes de regras.

O restante deste documento registra a etapa original de 02/10/2026. Referências
a dados em memória, carregamento estático e comandos síncronos são históricas;
o contrato dos campos, vínculos e cálculos continua válido.

Implementado originalmente em 02/10/2026. Escopo desta etapa: dados locais por veículo,
carregamento/erro/vazio, navegação por URL e ações usadas pelas telas atuais.
Sem API, banco, persistência ou biblioteca adicional de estado/rotas.

## Arquivos e responsabilidades

| Arquivo | Responsabilidade |
| --- | --- |
| `public/data/autocuida.json` | Única fonte dos dados iniciais |
| `src/data/loadData.js` | `fetch`, status HTTP, leitura e validação; aceita cancelamento |
| `src/data/validation.js` | Formato, IDs, referências, campos e coerência cronológica |
| `src/state/autoCuida.js` | Atualizações imutáveis e seleção dos dados de um veículo |
| `src/hooks/useAutoCuida.js` | Ciclo de carregamento e comandos para a interface |
| `src/navigation/routes.js` | Funções puras para interpretar e normalizar URLs |
| `src/hooks/useHashNavigation.js` | Sincronização com o histórico do navegador |
| `src/App.jsx` | Conecta os módulos às páginas |

## Formato dos dados

O JSON contém três listas: `vehicles`, `maintenanceItems`, `serviceRecords`.
Listas vazias são válidas. IDs são strings não vazias e únicos dentro de cada
lista. As referências também usam strings; não converter IDs com `Number()`.

```js
// vehicles
{ id: "2", plate: "ABC-1D23", model: "Onix 1.0", year: 2022,
  currentKm: 22000, active: true }

// maintenanceItems
{ id: "5", vehicleId: "2", name: "Óleo do Motor", active: true,
  initialReference: { date: "2026-07-01", km: 20000 },
  intervalKm: 10000, intervalMonths: 12 }

// serviceRecords
{ id: "uuid", vehicleId: "2", maintenanceItemId: "5",
  itemName: "Óleo do Motor", maintenanceType: "preventive",
  serviceDate: "2026-10-02", serviceKm: 22000,
  amount: 100, shop: "Oficina de teste" }
```

- Datas são `YYYY-MM-DD`; km e intervalos são inteiros não negativos.
- Valor do serviço é um número finito maior que zero, em reais.
- `intervalKm` ou `intervalMonths` pode ser zero para desabilitar aquela dimensão;
  pelo menos um precisa ser positivo. Não usar `null` ou omitir o campo.
- Placas repetidas, após retirar separadores e converter para maiúsculas, são rejeitadas.
- Item e serviço devem apontar para um veículo existente; o item do serviço deve
  pertencer ao mesmo veículo. Um JSON inválido é rejeitado por inteiro.
- `active: false` retira veículo/item da seleção ativa, preservando registros.
  Na etapa de remoção de itens, usar esse campo em vez de apagar o objeto
  referenciado pelo histórico. Esta etapa não acrescenta botões de inativação.
- `itemName` é uma cópia do nome na data do registro, para manter o histórico
  legível após uma futura alteração de nome.

## Referência inicial e histórico

`initialReference` é a referência conhecida ao configurar o item. Nunca é
sobrescrita por um serviço. `getMaintenanceReference(item, records)` encontra
a referência mais recente entre ela e os serviços do mesmo item/veículo.
No mesmo dia, a maior quilometragem desempata.

`selectVehicleData(data, vehicleId)` retorna `{ vehicle, maintenanceItems,
serviceRecords }`. Os itens retornados ganham `lastServiceDate` e `lastServiceKm`
derivados para uso pelas telas e pela função de desgaste. Não persistir esses
dois campos derivados no JSON ou escrever neles diretamente.

Uma futura edição/exclusão altera o histórico e essa consulta recalcula a
referência anterior ou inicial. Essa derivação já está testada; as ações e
telas de edição/exclusão serão implementadas em sua própria etapa.

## Comandos disponíveis

O hook `useAutoCuida()` é instanciado somente no `App`, dono do estado. Não
instanciá-lo em cada página: isso criaria cópias independentes dos dados.
As páginas recebem os dados e callbacks por props, como já acontecia no projeto.

- `updateOdometer(vehicleId, currentKm)`: aceita somente incremento inteiro
  de um veículo ativo. Dispara `odometerUpdated` no reducer.
- `registerVehicle(input)`: valida placa única (incluindo veículos inativos),
  modelo obrigatório, ano entre 1886 e o próximo ano e km inteira não negativa.
  Gera UUID e dispara `vehicleRegistered`; retorna o veículo para o App selecioná-lo
  na URL. A validação fica em `src/state/vehicles.js`. Não cria itens ou serviços.
- `registerService(vehicleId, input)`: recebe os campos do formulário, valida,
  gera UUID, vincula ao veículo/item correto e retorna o registro para confirmação.
  Dispara `serviceRegistered`. O reducer atualiza histórico e odômetro juntos.
- `retry()`: nova leitura do JSON após falha ou ausência de veículos ativos.

O formulário não define `vehicleId`, `itemName` ou `id` do registro final.
Esses valores são definidos pela base. Comandos inválidos lançam mensagens
tratadas pelos formulários, antes de alterar os dados.

Registrar um serviço aumenta o odômetro apenas se a km informada for maior.
Retroativos coerentes entram no histórico, mas não substituem referências mais
recentes. A cronologia de um novo registro é comparada com o histórico do veículo
e a referência inicial do item: uma data anterior não pode ter km maior que uma
data posterior. No mesmo dia, leituras distintas são aceitas.

## Carregamento e navegação

`loadData` lê o JSON servido pelo Vite e trata status HTTP e conteúdo inválido.
O hook cancela a leitura ao desmontar e ignora respostas canceladas, inclusive
no ciclo de verificação do React Strict Mode. Estados: `loading`, `ready`, `error`.
A navegação continua disponível durante carregamento/erro. Não há atraso
artificial no aplicativo.

As URLs usam hash, permitindo servir o build estaticamente sem configurar
reescrita de caminhos no servidor:

- `#/painel?veiculo=1`
- `#/garagem?veiculo=2`
- `#/servico?veiculo=1&item=2`
- `#/custos?veiculo=2`

A URL é a fonte da seleção ativa; ela não fica duplicada no estado de dados.
Tela desconhecida retorna ao painel. Veículo ausente/inativo cai no primeiro
ativo; sem ativos, aparece uma mensagem. Item de outro veículo ou inativo
é removido da URL. Normalizações usam `replaceState`, sem acrescentar entradas
inválidas ao histórico. A navegação do usuário cria entradas para Voltar/Avançar.

Ao trocar de veículo, formulários são remontados: rascunhos, mensagens e item
selecionado do veículo anterior não são transferidos. Recarregar mantém a URL,
mas restaura os dados do JSON, conforme o escopo em memória.

## Continuidade do grupo

Adicionar novas operações como ações no reducer, com validação e teste de
isolamento. Reutilizar os seletores; não filtrar cada lista de modo diferente
em cada página. Concentrar mudanças no módulo da funcionalidade e combinar quem
edita o estado compartilhado e o `App` em cada etapa.

Antes de encerrar uma etapa: `npm test`, `npm run build`, cenário da tela,
diff revisado e commit. Enviar a branch e abrir PR para revisão de um colega;
integrar antes de os demais iniciarem trabalho dependente.

Continuam pendentes: edição/inativação de veículos, gestão de itens, edição/exclusão de
serviços, kit visual, filtro por situação e revisão de arredondamento/calendário
dos alertas. O suporte a intervalos desabilitados apenas evita valores inválidos;
não representa homologação de todas as regras de desgaste.

`docs/GPTI/` é mantida exclusivamente pelo grupo de gestão e fica fora das
alterações desta frente.
