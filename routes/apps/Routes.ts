import { Router } from "express";
import IRoute from "../../interfaces/IRoute";

class Routes {
  public router: Router;

  constructor(public path: string, routes: IRoute[]) {
    this.router = Router();
    this.path = path;
    this.initializeRoutes(routes);
  }

  public initializeRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.router.use(route.path, route.router);
    });
  }
}

export default Routes;
