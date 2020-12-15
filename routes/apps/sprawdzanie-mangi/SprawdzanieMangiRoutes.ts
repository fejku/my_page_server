import Routes from "../Routes";
import ChapterRoutes from "./ChapterRoutes";
import MangaRoutes from "./MangaRoutes";
import PobierzMangeRoutes from "./PobierzMangeRoutes";

class SprawdzanieMangiRoutes extends Routes {
  constructor() {
    super("/sprawdzanie-mangi", [new MangaRoutes(), new ChapterRoutes(), new PobierzMangeRoutes()]);
  }
}

export default SprawdzanieMangiRoutes;
