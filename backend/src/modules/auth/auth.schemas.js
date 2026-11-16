import { z } from "zod";

const email = z
  .string({ error: "Informe o e-mail." })
  .trim()
  .toLowerCase()
  .pipe(z.email({ error: "Informe um e-mail válido." }).max(254, "O e-mail é longo demais."));

// bcrypt só considera os primeiros 72 bytes da senha.
const newPassword = z
  .string({ error: "Informe a senha." })
  .min(8, "A senha deve ter pelo menos 8 caracteres.")
  .refine((value) => Buffer.byteLength(value, "utf8") <= 72, "A senha deve ter no máximo 72 bytes.");

export const registerSchema = z.object(
  {
    name: z
      .string({ error: "Informe o nome." })
      .trim()
      .min(1, "Informe o nome.")
      .max(100, "O nome deve ter no máximo 100 caracteres."),
    email,
    password: newPassword,
  },
  { error: "Envie os dados em formato JSON." },
);

// No login não se aplica a política de senha: só exige um texto não vazio.
export const loginSchema = z.object(
  {
    email,
    password: z.string({ error: "Informe a senha." }).min(1, "Informe a senha.").max(1024),
  },
  { error: "Envie os dados em formato JSON." },
);
