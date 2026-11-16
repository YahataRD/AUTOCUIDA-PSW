// Configuração de autenticação. Segue o estilo de config.js: valida o ambiente
// e falha com mensagem clara. Nenhum valor real deve ser versionado.
const UNITS = { s: 1, m: 60, h: 3600, d: 86400 };
const MAX_EXPIRATION_SECONDS = 7 * UNITS.d;

export function readAuthConfig(env = process.env) {
  const jwtSecret = env.JWT_SECRET?.trim();
  if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error("Configure JWT_SECRET no ambiente com pelo menos 32 caracteres.");
  }

  const expiresText = (env.JWT_EXPIRES_IN ?? "2h").trim();
  const match = /^(\d+)([smhd])$/.exec(expiresText);
  const jwtExpiresInSeconds = match ? Number(match[1]) * UNITS[match[2]] : 0;
  if (jwtExpiresInSeconds < 1 || jwtExpiresInSeconds > MAX_EXPIRATION_SECONDS) {
    throw new Error("JWT_EXPIRES_IN deve ter formato como 30m, 2h ou 1d, com no máximo 7d.");
  }

  const roundsText = env.BCRYPT_ROUNDS ?? "12";
  const bcryptRounds = Number(roundsText);
  if (!/^\d+$/.test(roundsText) || bcryptRounds < 10 || bcryptRounds > 14) {
    throw new Error("BCRYPT_ROUNDS deve ser um inteiro entre 10 e 14.");
  }

  return { jwtSecret, jwtExpiresInSeconds, bcryptRounds };
}
