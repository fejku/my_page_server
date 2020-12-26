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
    this.router.get("/:id/chaptery", this.authController.authenticateJWT, this.mangaController.getAllChapters);
    this.router.get("/:id/odswiez", this.authController.authenticateJWT, this.mangaController.odswiez);
    this.router.post("/", this.authController.authenticateJWT, this.mangaController.create);
    this.router.post("/pobierz-dane", this.authController.authenticateJWT, this.mangaController.pobierzDane);
    this.router.put("/:id", this.authController.authenticateJWT, this.mangaController.edit);
    this.router.delete("/:id", this.authController.authenticateJWT, this.mangaController.delete);
  }
}

export default MangaRoutes;
