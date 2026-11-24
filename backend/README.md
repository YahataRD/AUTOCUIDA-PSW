# API Express — autenticação e veículos

A API expõe cadastro, login e rotas de veículos. O processo conecta ao MongoDB
e cria os índices de usuários e veículos antes de abrir a porta HTTP.
`GET /health` confirma o processo HTTP; `GET /ready` faz ping no banco e retorna
200 quando disponível ou 503 com `DATABASE_UNAVAILABLE` quando indisponível.

## Instalação e execução

Node.js 22.12+ com npm. Na raiz do repositório:

```bash
npm ci
```

Configure um MongoDB de desenvolvimento e copie `backend/.env.example` para
`backend/.env`, ajustando `MONGO_URL` e `JWT_SECRET` em um editor local. Use um segredo
aleatório de pelo menos 32 caracteres. O token expira em 2 horas por padrão
e o bcrypt usa 12 rodadas. Execute:

```bash
npm run start:backend
```

Abra `http://127.0.0.1:3001/health`. Resposta esperada:

```json
{ "status": "ok", "service": "autocuida-api" }
```

`npm run dev:backend` reinicia o processo quando o código mudar.
`npm run test:backend` executa testes HTTP e integração com MongoDB temporário.
No PowerShell com scripts bloqueados, use `npm.cmd`.

Para personalizar, copie `backend/.env.example` para `backend/.env`. `PORT` define
a porta (1–65535), `HOST` o endereço de escuta e `CORS_ORIGINS` uma lista de origens
sem caminho, separadas por vírgula. `MONGO_URL` é obrigatória e pode vir do `.env`
ou do ambiente do processo. `MONGO_TIMEOUT_MS` limita a seleção/conexão e o tempo
de inatividade de socket (padrão 5000, entre 100 e 60000 ms). Não equivale a um
prazo total para qualquer operação. Os comandos carregam o `.env` de `backend`.
Sem configuração válida ou sem conexão inicial, o processo encerra com código 1
sem abrir HTTP. A URI e os erros brutos do driver não são impressos.

O exemplo local pressupõe MongoDB já disponível; copiar o arquivo não instala
o banco. Uma URI Atlas também é aceita (`mongodb+srv://...`). Configure usuário,
permissões e acesso de rede no provedor antes de usar. Não envie credenciais
no chat nem faça commit do `.env`.

O mock usa a mesma porta 3001: pare-o antes de iniciar o Express ou configure
outra porta, por exemplo `PORT=3002`. Para usar o Express com a interface de
login e garagem, siga a [configuração do frontend](../README.md#evolução-do-backend--express).
Para o fluxo do mock, mantenha o frontend no modo `api`.

## Como os colegas podem integrar seus módulos

- `src/app.js` exporta `createApp`, sem abrir porta ou conectar ao banco.
- `src/server.js` lê configuração e inicia o processo HTTP.
- `src/runtime.js` conecta antes de escutar e exporta encerramento aguardável.
- `src/database.js` gerencia a conexão padrão Mongoose. Modelos podem usar
  `mongoose.model()`; não abrir outra conexão em cada rota. O buffering está
  desativado para não enfileirar silenciosamente operações sem conexão.
- Registrar routers de módulos antes de `notFound` e `errorHandler` em `app.js`.
- Padrão de erro: `{ "error": { "code": "...", "message": "..." } }`.
  `src/errors.js` define a classe compartilhada `HttpError`. O contrato inclui
  `fields` quando há erros por campo.
- Erros inesperados retornam mensagem genérica; JSON inválido retorna 400,
  corpo maior que 100 KB retorna 413 e rota desconhecida retorna 404.
- CORS permite leitura apenas nas origens configuradas; não substitui JWT ou
  autorização. O preflight aceita os métodos/cabeçalhos usados pelo cliente.
- Não criar rotas de negócio desprotegidas para contornar a integração JWT.

SIGINT/SIGTERM interrompem a aceitação de requisições e fecham a conexão MongoDB.
Após 5 s, conexões HTTP remanescentes são encerradas para permitir a finalização.
Se a porta estiver ocupada, a conexão com o banco também é liberada.

## Testes com banco isolado

A suíte usa `mongodb-memory-server` para iniciar um processo MongoDB real e
temporário. Ela não lê `MONGO_URL` do ambiente e não altera o banco de ninguém.
Na primeira instalação ou execução, o binário MongoDB é baixado; é preciso acesso à internet
e espaço para o cache (o pacote Windows pode ocupar centenas de MB). As execuções
seguintes reutilizam o binário. `MONGOMS_DOWNLOAD_DIR` permite escolher a pasta
de cache. O processo e seus dados temporários são removidos ao terminar a suíte.

Os testes verificam escrita/leitura após reconectar, readiness com o banco
desconectado, falha inicial, liberação da conexão após porta ocupada e encerramento
idempotente. O teste `vehicles-jwt.test.js` usa a aplicação principal com dois
usuários, tokens reais e MongoDB temporário para verificar o isolamento.

O teste `maintenance-jwt.test.js` cobre itens e serviços de duas contas, vínculos
inválidos, manutenção do histórico e gravações concorrentes no mesmo veículo.
Nenhuma seed/reset é executada na inicialização.

## Modelo de veículo

O módulo `src/modules/vehicles/` contém o modelo Mongoose, schemas Zod de cadastro,
edição, odômetro e inativação. Placa é normalizada e única globalmente, inclusive
para veículos inativos; proprietário é obrigatório e imutável. O JSON público
preserva o formato do frontend, com `id` texto e sem campos internos.

Cadastre a conta em `POST /usuarios` com nome, e-mail e senha. Obtenha o token
em `POST /login` com e-mail e senha. Envie `Authorization: Bearer <token>` nas
rotas `/vehicles`. As operações usam o proprietário autenticado e as gravações
de odômetro são atômicas. Veja o [guia de veículos](../docs/backend-veiculos.md).

## Carga inicial M2.4

O script `backend/scripts/seed.js` cria ou atualiza um usuário de aplicação e
restaura para ele os veículos, itens e serviços da seed compartilhada.
Ele exige `MONGO_URL` e duas variáveis locais:

```powershell
$env:SEED_USER_EMAIL="demo@autocuida.local"
$env:SEED_USER_PASSWORD="uma-senha-com-ao-menos-oito-caracteres"
npm run seed:backend
```

A carga remove somente os veículos pertencentes ao usuário informado; não altera
veículos de outras contas. Não execute o script automaticamente na inicialização:
ele é uma operação explícita de preparação do ambiente compartilhado.

## Itens de manutenção e serviços

Envie o Bearer JWT em todas as operações de `/maintenanceItems` e
`/serviceRecords`. A listagem pode ser filtrada por `?vehicleId=<id>` e
inclui o histórico dos veículos inativos da conta. Uma busca direta por
um recurso ausente ou de outra conta retorna `404`.

| Método | Rota | Corpo ou resultado |
| --- | --- | --- |
| GET | `/maintenanceItems`, `/serviceRecords` | Lista da conta |
| GET | `/maintenanceItems/:id`, `/serviceRecords/:id` | Registro da conta |
| POST | `/maintenanceItems` | `vehicleId`, `name`, `intervalKm`, `intervalMonths` e `initialReference` com `date` e `km` |
| PUT | `/maintenanceItems/:id` | Campos do cadastro, exceto `vehicleId` |
| PATCH | `/maintenanceItems/:id` | `{"active":false}` inativa o item e preserva o histórico |
| POST | `/serviceRecords` | `vehicleId`, `maintenanceItemId`, `maintenanceType` (`preventive` ou `corrective`), `serviceDate`, `serviceKm`, `amount` e `shop` |
| PUT | `/serviceRecords/:id` | Campos do cadastro, exceto `vehicleId` |
| DELETE | `/serviceRecords/:id` | Exclui o registro e retorna `204` |

Os IDs são strings. Envie datas em `AAAA-MM-DD` e valores numéricos como números
JSON. Serviços só podem usar itens do mesmo veículo. Um serviço existente pode
manter seu vínculo com um item que foi inativado. O nome do item é registrado
junto ao serviço e permanece no histórico após uma renomeação. O veículo
inativo mantém o histórico disponível para consulta.

O MongoDB armazena itens e serviços no documento do veículo. Registrar ou
editar um serviço atualiza o histórico e o odômetro em uma única gravação.
Editar ou excluir um serviço nunca reduz o odômetro. Se outra gravação alterar
o veículo antes de concluir a operação, a API pode retornar `409` com
`CONCURRENT_UPDATE`. Recarregue os dados antes de tentar novamente.

Referências: [tratamento de erros Express](https://expressjs.com/en/guide/error-handling/)
e [CORS](https://expressjs.com/en/resources/middleware/cors/),
[conexões Mongoose](https://mongoosejs.com/docs/connections.html).
