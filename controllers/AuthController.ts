import { NextFunction, Request, Response } from "express";
import passport from "passport";

class AuthController {
  public authenticateLocal(request: Request, response: Response, next: NextFunction) {
    passport.authenticate("local", { session: false })(request, response, next);
  }

  public authenticateJWT(request: Request, response: Response, next: NextFunction) {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
      if (error) {
        return response.status(401).json({ status: "error", code: { message: "unauthorized" } });
      }

      if (!user) {
        return response.status(401).json({ status: "error", code: { message: "unauthorized" } });
      }

      request.user = user;
      return next();
    })(request, response, next);
  }
}

export default AuthController;
