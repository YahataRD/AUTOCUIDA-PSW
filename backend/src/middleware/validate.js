import { HttpError } from "./httpError.js";

export function parseWith(schema, data) {
  const result = schema.safeParse(data);
  if (result.success) return result.data;
  const fields = {};
  for (const issue of result.error.issues) {
    const key = issue.path.join(".") || "_";
    fields[key] ??= issue.message;
  }
  throw new HttpError(400, "VALIDATION_ERROR", "Confira os campos informados.", fields);
}

export const validateBody = (schema) => (req, res, next) => {
  try {
    req.body = parseWith(schema, req.body);
    next();
  } catch (error) {
    next(error);
  }
};
