import { Router } from "express";
import AuthController from "../../../controllers/AuthController";
import PotrawyController from "../../../controllers/apps/posilki/PotrawyController";

class PotrawyRoutes {
  public path = "/potrawy";

  public router: Router;
  public authController = new AuthController();
  public potrawyController = new PotrawyController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.authController.authenticateJWT, this.potrawyController.getAllPotrawy);
  }
}

export default PotrawyRoutes;
