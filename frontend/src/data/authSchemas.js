import { z } from "zod";

// Espelham as regras do servidor (backend/src/modules/auth/auth.schemas.js).
// O servidor continua sendo a autoridade: estes schemas só dão resposta rápida.
const email = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(z.email({ error: "Informe um e-mail válido." }));

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Informe a senha."),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(1, "Informe o nome.").max(100, "O nome deve ter no máximo 100 caracteres."),
    email,
    password: z
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres.")
      .refine((v) => new TextEncoder().encode(v).length <= 72, "A senha deve ter no máximo 72 bytes."),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "As senhas não conferem.",
    path: ["confirmPassword"],
  });
