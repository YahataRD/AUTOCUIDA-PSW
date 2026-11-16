import passport from "passport";
import passportJwt from "passport-jwt";
import { HttpError } from "./httpError.js";

const { Strategy: JwtStrategy, ExtractJwt } = passportJwt;

// Contrato de identidade: depois de passar por este middleware,
// req.user = { id: "<string>", name, email }.
// Use req.user.id como proprietário. Nunca aceite ownerId vindo do corpo.
export function createAuthenticate({ jwtSecret }, authService) {
  // Instância própria: não depende de passport.initialize() nem de estado global.
  const instance = new passport.Passport();
  instance.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret,
        algorithms: ["HS256"],
      },
      (payload, done) => {
        authService.findUserById(payload.sub).then((user) => done(null, user ?? false), done);
      },
    ),
  );

  return function authenticate(req, res, next) {
    instance.authenticate("jwt", { session: false }, (error, user, info) => {
      if (error) return next(error);
      if (!user) {
        const expired = info?.name === "TokenExpiredError";
        return next(
          expired
            ? new HttpError(401, "TOKEN_EXPIRED", "Sua sessão expirou. Entre novamente.")
            : new HttpError(401, "UNAUTHENTICATED", "Autenticação necessária."),
        );
      }
      req.user = user;
      next();
    })(req, res, next);
  };
}
