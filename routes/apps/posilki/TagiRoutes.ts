import { Router } from "express";
import AuthController from "../../../controllers/AuthController";
import TagiController from "../../../controllers/apps/posilki/TagiController";

class TagiRoutes {
  public path = "/tagi";

  public router: Router;
  public authController = new AuthController();
  public tagiController = new TagiController();

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", this.authController.authenticateJWT, this.tagiController.getAllTagi);
  }
}

export default TagiRoutes;
