import Routes from "../Routes";
import PotrawyRoutes from "./PotrawyRoutes";
import TagiRoutes from "./TagiRoutes";

class PosilkiRoutes extends Routes {
  constructor() {
    super("/posilki", [new PotrawyRoutes(), new TagiRoutes()]);
  }
}

export default PosilkiRoutes;
