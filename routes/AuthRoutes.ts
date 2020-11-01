import { Router } from "express";
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";

class AuthRoutes {

  public path = "/auth";

  public router: Router;
  public authController = new AuthController();
  public userController = new UserController();

  constructor() {
    this.router = Router();
    this.routes();
  }
  
  routes() {
    this.router.post("/register", this.userController.register);
    this.router.post("/login", this.authController.authenticateLocal, this.userController.login);
    this.router.get("/logout", this.authController.authenticateJWT, this.userController.logout);
  }
}

export default AuthRoutes;