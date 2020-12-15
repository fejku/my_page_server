import { Router } from "express";
import AuthController from "../../../controllers/AuthController";
import MangaController from "../../../controllers/apps/sprawdzanie-mangi/MangaController";

class MangaRoutes {
  public path = "/manga";

  public router: Router;
  public authController = new AuthController();
  public mangaController = new MangaController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.authController.authenticateJWT, this.mangaController.getAll);
    // this.router.get("/", this.authController.authenticateJWT, this.mangaController.getAllPotrawy);
    // this.router.get("/:id", this.authController.authenticateJWT, this.mangaController.getPotraweById);
    // this.router.post("/", this.authController.authenticateJWT, this.mangaController.createPotrawe);
    // this.router.put("/:id", this.authController.authenticateJWT, this.mangaController.editPotrawe);
    // this.router.delete("/:id", this.authController.authenticateJWT, this.mangaController.deletePotrawe);
  }
}

export default MangaRoutes;
