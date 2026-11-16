import { createAuthenticate } from "../../middleware/authenticate.js";
import { createAuthRouter } from "./auth.routes.js";
import { createAuthService } from "./auth.service.js";

// config = resultado de readAuthConfig().
export function createAuthModule(config) {
  const service = createAuthService(config);
  return {
    router: createAuthRouter(service), // POST /usuarios e POST /login
    authenticate: createAuthenticate(config, service), // middleware Bearer
  };
}
