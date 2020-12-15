import { Router } from "express";
import AuthController from "../../../controllers/AuthController";
import PobierzMangeController from "../../../controllers/apps/sprawdzanie-mangi/PobierzMangeController";

class PobierzMangeRoutes {
  public path = "/pobierz-mange";

  public router: Router;
  public authController = new AuthController();
  public pobierzMangeController = new PobierzMangeController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get(
      "/",
      // this.authController.authenticateJWT,
      this.pobierzMangeController.pobierz,
    );
  }
}

export default PobierzMangeRoutes;
