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
    this.router.get("/:id", this.authController.authenticateJWT, this.potrawyController.getPotraweById);
    this.router.post("/", this.authController.authenticateJWT, this.potrawyController.createPotrawe);
    this.router.put("/:id", this.authController.authenticateJWT, this.potrawyController.editPotrawe);
    this.router.delete("/:id", this.authController.authenticateJWT, this.potrawyController.deletePotrawe);
  }
}

export default PotrawyRoutes;
