import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpError } from "../../errors.js";
import { User } from "./user.model.js";

const OBJECT_ID = /^[0-9a-f]{24}$/i;

export function createAuthService({ jwtSecret, jwtExpiresInSeconds, bcryptRounds }) {
  // Hash descartável: login de e-mail inexistente gasta o mesmo tempo de um
  // login com senha errada, sem revelar quais e-mails existem.
  const dummyHash = bcrypt.hashSync("senha-descartavel", bcryptRounds);
  const publicUser = (user) => ({ id: String(user._id), name: user.name, email: user.email });

  return {
    async register({ name, email, password }) {
      const passwordHash = await bcrypt.hash(password, bcryptRounds);
      try {
        return publicUser(await User.create({ name, email, passwordHash }));
      } catch (error) {
        if (error?.code === 11000) {
          throw new HttpError(409, "EMAIL_IN_USE", "Este e-mail já está cadastrado.", {
            email: "Este e-mail já está cadastrado.",
          });
        }
        throw error;
      }
    },

    async login({ email, password }) {
      const user = await User.findOne({ email }).select("+passwordHash");
      const matches = await bcrypt.compare(password, user?.passwordHash ?? dummyHash);
      if (!user || !matches) {
        throw new HttpError(401, "INVALID_CREDENTIALS", "E-mail ou senha inválidos.");
      }
      const token = jwt.sign({}, jwtSecret, {
        algorithm: "HS256",
        subject: String(user._id),
        expiresIn: jwtExpiresInSeconds,
      });
      return { token, user: publicUser(user) };
    },

    async findUserById(id) {
      if (typeof id !== "string" || !OBJECT_ID.test(id)) return null;
      const user = await User.findById(id);
      return user ? publicUser(user) : null;
    },
  };
}
