import Routes from "./apps/Routes";
import PosilkiRoutes from "./apps/posilki/PosilkiRoutes";
import SprawdzanieMangiRoutes from "./apps/sprawdzanie-mangi/SprawdzanieMangiRoutes";

class AppsRoutes extends Routes {
  constructor() {
    super("/apps", [new PosilkiRoutes(), new SprawdzanieMangiRoutes()]);
  }
}

export default AppsRoutes;
