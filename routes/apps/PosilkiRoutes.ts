import { Router } from "express";
import AuthController from "../../controllers/AuthController";
import PosilkiController from "../../controllers/apps/PosilkiController";

class PosilkiRoutes {
  public path = "/posilki";

  public router: Router;
  public authController = new AuthController();
  public posilkiController = new PosilkiController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.authController.authenticateJWT, this.posilkiController.getAllPosilki);
  }
}

export default PosilkiRoutes;
