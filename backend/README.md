# API Express — veículos preparados para integração JWT

Base para os módulos de veículos, itens, serviços e autenticação. O processo conecta
ao MongoDB por Mongoose antes de abrir a porta HTTP. Ainda não há rotas de negócio.
`GET /health` confirma o processo HTTP; `GET /ready` faz ping no banco e retorna
200 quando disponível ou 503 com `DATABASE_UNAVAILABLE` quando indisponível.

## Instalação e execução

Node.js 22.12+ com npm. Na raiz do repositório:

```bash
npm ci
```

Configure um MongoDB de desenvolvimento e copie `backend/.env.example` para
`backend/.env`, ajustando `MONGO_URL` em um editor local. Então execute:

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
outra porta, por exemplo `PORT=3002`. `npm start` e `npm run preview` na raiz
continuam executando o frontend com o mock. Apontar o frontend para o Express
nesta etapa fará as consultas de negócio retornarem 404; a migração virá depois.

## Como os colegas podem integrar seus módulos

- `src/app.js` exporta `createApp`, sem abrir porta ou conectar ao banco.
- `src/server.js` lê configuração e inicia o processo HTTP.
- `src/runtime.js` conecta antes de escutar e exporta encerramento aguardável.
- `src/database.js` gerencia a conexão padrão Mongoose. Modelos podem usar
  `mongoose.model()`; não abrir outra conexão em cada rota. O buffering está
  desativado para não enfileirar silenciosamente operações sem conexão.
- Registrar routers de módulos antes de `notFound` e `errorHandler` em `app.js`.
- Padrão de erro: `{ "error": { "code": "...", "message": "..." } }`.
  Erros de campo e identidade serão implementados com seus módulos.
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
idempotente. Isso comprova a integração de conexão, não os futuros CRUDs.

O MongoDB temporário de testes não é banco de desenvolvimento nem prova suporte
a transações. Para a próxima etapa de serviços, provisionar replica set e testar
as transações nesse ambiente. Nenhuma seed/reset é executada na inicialização.

## Modelo de veículo

O módulo `src/modules/vehicles/` contém o modelo Mongoose, schemas Zod de cadastro,
edição, odômetro e inativação. Placa é normalizada e única globalmente, inclusive
para veículos inativos; proprietário é obrigatório e imutável. O JSON público
preserva o formato do frontend, com `id` texto e sem campos internos.

O módulo já tem serviços, repositório e router que exige middleware de autenticação.
As rotas ainda não estão montadas na aplicação, aguardando JWT real. Atualizações
do odômetro usam condições atômicas; consultas e alterações isolam proprietários.
Interfaces, regras e limites estão no [guia de veículos](../docs/backend-veiculos.md).

Próximas integrações: montagem do router após JWT, inicialização dos índices antes
de `listen`, testes com tokens reais e seed com vínculos/usuários preservados.

Referências: [tratamento de erros Express](https://expressjs.com/en/guide/error-handling/)
e [CORS](https://expressjs.com/en/resources/middleware/cors/),
[conexões Mongoose](https://mongoosejs.com/docs/connections.html).
