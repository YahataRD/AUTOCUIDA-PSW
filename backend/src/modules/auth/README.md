# Módulo de autenticação (usuários + JWT)

Contrato para as demais frentes. Rotas públicas: `POST /usuarios` e `POST /login`.

## Dependências

Instale as dependências declaradas com `npm ci` na raiz.

## Variáveis de ambiente de `backend/.env`

```text
JWT_SECRET=         # obrigatório, mínimo 32 caracteres; nunca versionar valor real
JWT_EXPIRES_IN=2h   # opcional: 30m, 2h, 1d (máximo 7d)
BCRYPT_ROUNDS=12    # opcional: 10 a 14
```

## Inicialização

`server.js` carrega a configuração JWT. `runtime.js` conecta ao MongoDB e cria os
índices de usuários e veículos antes de abrir a porta. `app.js` monta cadastro e
login e passa `auth.authenticate` à factory das rotas de veículos.

## Identidade

Depois de `auth.authenticate`, `req.user = { id: "<string>", name, email }`.
Use `req.user.id` como proprietário nas consultas (`{ ownerId: req.user.id }`).
Nunca aceite `ownerId` vindo do corpo.

## Erros

Os middlewares lançam `HttpError(status, code, message, fields?)`
(`backend/src/errors.js`). O tratador central devolve:

```json
{ "error": { "code": "...", "message": "...", "fields": { "campo": "mensagem" } } }
```

Códigos usados aqui: `VALIDATION_ERROR` (400), `INVALID_CREDENTIALS` (401),
`UNAUTHENTICATED` (401), `TOKEN_EXPIRED` (401), `EMAIL_IN_USE` (409).
O tratador também deve devolver 400 para JSON malformado e 500 sem detalhes internos.
`parseWith` e `validateBody` (`middleware/validate.js`) servem para validar o corpo em outras rotas.

## CORS

A configuração de CORS precisa permitir o cabeçalho `Authorization` e os métodos
`GET, POST, PUT, PATCH, DELETE`.

## Testes

```bash
node --test tests/authConfig.test.js          # sem banco
MONGO_TEST_URL=<banco isolado de testes> node --test tests/auth.http.test.js
```

Os testes HTTP só apagam os usuários que eles mesmos criam.
