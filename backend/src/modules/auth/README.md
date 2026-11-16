# Módulo de autenticação (usuários + JWT)

Contrato para as demais frentes. Rotas públicas: `POST /usuarios` e `POST /login`.

## Dependências

```bash
npm i express mongoose zod bcrypt jsonwebtoken passport passport-jwt
npm i -D supertest
```

Zod deve ser a versão 4 (mesma do frontend).

## Variáveis de ambiente (acrescentar ao `.env.example`)

```text
JWT_SECRET=         # obrigatório, mínimo 32 caracteres; nunca versionar valor real
JWT_EXPIRES_IN=2h   # opcional: 30m, 2h, 1d (máximo 7d)
BCRYPT_ROUNDS=12    # opcional: 10 a 14
```

## Ligação no `app.js`

```js
import { readAuthConfig } from "./config/authConfig.js";
import { createAuthModule } from "./modules/auth/index.js";

const auth = createAuthModule(readAuthConfig());
app.use(express.json());
app.use(auth.router);                                 // /usuarios e /login
app.use("/vehicles", auth.authenticate, vehiclesRouter);
```

No `server.js`, depois de conectar ao MongoDB e antes do `listen`, chame
`await User.init()` (de `modules/auth/user.model.js`) para garantir o índice único de e-mail.

## Identidade

Depois de `auth.authenticate`, `req.user = { id: "<string>", name, email }`.
Use `req.user.id` como proprietário nas consultas (`{ ownerId: req.user.id }`).
Nunca aceite `ownerId` vindo do corpo.

## Erros

Os middlewares lançam `HttpError(status, code, message, fields?)`
(`middleware/httpError.js`). O tratador central de erros deve responder:

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
