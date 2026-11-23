// Somente erros previstos pela aplicação podem publicar mensagem e campos.
export class HttpError extends Error {
  constructor(status, code, message, fields) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;
    this.fields = fields;
  }
}
