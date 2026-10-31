export function notFound(req, res) {
  res.status(404).json({
    error: { code: "NOT_FOUND", message: "Rota não encontrada." },
  });
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({
      error: { code: "INVALID_JSON", message: "O corpo deve conter JSON válido." },
    });
  }
  if (error.type === "entity.too.large") {
    return res.status(413).json({
      error: { code: "PAYLOAD_TOO_LARGE", message: "O corpo excede o limite de 100 KB." },
    });
  }
  // Não refletir mensagens, stacks ou propriedades de erros inesperados ao cliente.
  res.status(500).json({
    error: { code: "INTERNAL_ERROR", message: "Não foi possível concluir a operação." },
  });
}
