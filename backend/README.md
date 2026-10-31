# API Express — etapa 1

Base HTTP para os módulos de veículos, itens, serviços e autenticação. Esta etapa
oferece somente `GET /health`; ainda não há MongoDB ou rotas de negócio. `health`
confirma o processo HTTP, não a disponibilidade de persistência.

## Instalação e execução

Node.js 22.12+ com npm. Na raiz do repositório:

```bash
npm ci
npm run start:backend
```

Abra `http://127.0.0.1:3001/health`. Resposta esperada:

```json
{ "status": "ok", "service": "autocuida-api" }
```

`npm run dev:backend` reinicia o processo quando o código mudar.
`npm run test:backend` executa testes HTTP em portas temporárias, sem banco.
No PowerShell com scripts bloqueados, use `npm.cmd`.

Para personalizar, copie `backend/.env.example` para `backend/.env`. `PORT` define
a porta (1–65535), `HOST` o endereço de escuta e `CORS_ORIGINS` uma lista de origens
sem caminho, separadas por vírgula. O arquivo `.env` é opcional nesta etapa e
ignorado pelo Git. Os comandos do pacote carregam o `.env` da pasta `backend`.

O mock usa a mesma porta 3001: pare-o antes de iniciar o Express ou configure
outra porta, por exemplo `PORT=3002`. `npm start` e `npm run preview` na raiz
continuam executando o frontend com o mock. Apontar o frontend para o Express
nesta etapa fará as consultas de negócio retornarem 404; a migração virá depois.

## Como os colegas podem integrar seus módulos

- `src/app.js` exporta `createApp`, sem abrir porta ou conectar ao banco.
- `src/server.js` lê configuração e inicia o processo HTTP.
- Registrar routers de módulos antes de `notFound` e `errorHandler` em `app.js`.
- Padrão de erro: `{ "error": { "code": "...", "message": "..." } }`.
  Erros de campo e identidade serão implementados com seus módulos.
- Erros inesperados retornam mensagem genérica; JSON inválido retorna 400,
  corpo maior que 100 KB retorna 413 e rota desconhecida retorna 404.
- CORS permite leitura apenas nas origens configuradas; não substitui JWT ou
  autorização. O preflight aceita os métodos/cabeçalhos usados pelo cliente.
- Não criar rotas de negócio desprotegidas para contornar a integração JWT.

Próxima etapa desta frente: conexão Mongoose antes de `listen`, configuração de
banco e testes isolados; depois, veículos/odômetro e seed com vínculos preservados.
Os contratos funcionais serão coordenados com os responsáveis por JWT e serviços.

Referências: [tratamento de erros Express](https://expressjs.com/en/guide/error-handling/)
e [CORS](https://expressjs.com/en/resources/middleware/cors/).
