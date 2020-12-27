import FanFoxParser from "./FanFoxParser";
import MangaReaderParser from "./MangaReaderParser";
import TaadParser from "./TaadParser";
import MangaSeeParser from "./MangaSeeParser";

enum HOSTNAME {
  MANGA_READER = "www.mangareader.net",
  MANGA_FANFOX = "fanfox.net",
  MANGA_SEE123 = "mangasee123.com",
  MANGA_TAAD = "www.taadd.com",
}

class MangaParserFactory {
  static getParser(url: string) {
    const hostname = this.getHostname(url);

    switch (hostname) {
      case HOSTNAME.MANGA_READER:
        return new MangaReaderParser(url);
      case HOSTNAME.MANGA_FANFOX:
        return new FanFoxParser(url);
      case HOSTNAME.MANGA_SEE123:
        return new MangaSeeParser(url);
      case HOSTNAME.MANGA_TAAD:
        return new TaadParser(url);
      default:
        throw new Error(`Nie obsługiwany parser: ${hostname}.`);
    }
  }

  private static getHostname = (url: string) => {
    const { hostname } = new URL(url);
    return hostname;
  };
}

export default MangaParserFactory;
