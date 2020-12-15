import { Router } from "express";
import AuthController from "../../../controllers/AuthController";
import ChapterController from "../../../controllers/apps/sprawdzanie-mangi/ChapterController";

class ChapterRoutes {
  public path = "/chapter";

  public router: Router;
  public authController = new AuthController();
  public chapterController = new ChapterController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.authController.authenticateJWT, this.chapterController.getAll);
    // this.router.get("/:id", this.authController.authenticateJWT, this.chapterController.getPotraweById);
    // this.router.post("/", this.authController.authenticateJWT, this.chapterController.createPotrawe);
    // this.router.put("/:id", this.authController.authenticateJWT, this.chapterController.editPotrawe);
    // this.router.delete("/:id", this.authController.authenticateJWT, this.chapterController.deletePotrawe);
  }
}

export default ChapterRoutes;
