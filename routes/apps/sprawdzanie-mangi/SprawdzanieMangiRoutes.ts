import Routes from "../Routes";
import ChapterRoutes from "./ChapterRoutes";
import MangaRoutes from "./MangaRoutes";

class SprawdzanieMangiRoutes extends Routes {
  constructor() {
    super("/sprawdzanie-mangi", [new MangaRoutes(), new ChapterRoutes()]);
  }
}

export default SprawdzanieMangiRoutes;
