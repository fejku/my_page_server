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
    this.router.post("/url", this.authController.authenticateJWT, this.chapterController.getChapteryByUrl);

    this.router.post("/test", this.chapterController.test);
  }
}

export default ChapterRoutes;
