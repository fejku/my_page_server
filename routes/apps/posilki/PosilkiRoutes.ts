import { Router } from "express";
import IRoute from "../../../interfaces/IRoute";
import PotrawyRoutes from "./PotrawyRoutes";
import TagiRoutes from "./TagiRoutes";

class PosilkiRoutes {
  public path = "/posilki";

  public router: Router;

  constructor() {
    this.router = Router();
    const posilkiRoutes = [new PotrawyRoutes(), new TagiRoutes()];
    this.initializeRoutes(posilkiRoutes);
  }

  private initializeRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.router.use(route.path, route.router);
    });
  }
}

export default PosilkiRoutes;
