// Erro de aplicação com status HTTP. O tratador central de erros (Yahata)
// deve serializar no formato do contrato:
// { error: { code, message, fields? } }
export class HttpError extends Error {
  constructor(status, code, message, fields) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}

// Compatível com Express 4 e 5: encaminha rejeições de handlers async.
export const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);
