import { Router } from "express";
import IRoute from "../interfaces/IRoute";
import PosilkiRoutes from "./apps/posilki/PosilkiRoutes";

class AppsRoutes {
  public path = "/apps";

  public router: Router;

  constructor() {
    this.router = Router();
    const appsRoutes = [new PosilkiRoutes()];
    this.initializeRoutes(appsRoutes);
  }

  private initializeRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.router.use(route.path, route.router);
    });
  }
}

export default AppsRoutes;
