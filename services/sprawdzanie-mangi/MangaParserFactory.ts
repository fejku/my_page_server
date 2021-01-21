import FanFoxParser from "./FanFoxParser";
import MangaReaderParser from "./MangaReaderParser";
import TaadParser from "./TaadParser";
import MangaSee123Parser from "./MangaSee123Parser";
import ReaperScansParser from "./ReaperScansParser";
import AsuraScansParser from "./AsuraScansParser";

enum HOSTNAME {
  MANGA_READER = "www.mangareader.net",
  MANGA_FANFOX = "fanfox.net",
  MANGA_SEE123 = "mangasee123.com",
  MANGA_TAAD = "www.taadd.com",
  MANGA_REAPER_SCANS = "reaperscans.com",
  MANGA_ASURA_SCANS = "asurascans.com",
}

// Kolejne strony możliwe do dodania
// https://www.mangatown.com/
// https://www.mangahere.cc/
// http://www.mangapark.me
// https://manganelo.com
// https://mangasee.net
// http://www.tenmanga.com/
class MangaParserFactory {
  static getParser(url: string) {
    const hostname = this.getHostname(url);

    switch (hostname) {
      case HOSTNAME.MANGA_READER:
        return new MangaReaderParser(url);
      case HOSTNAME.MANGA_FANFOX:
        return new FanFoxParser(url);
      case HOSTNAME.MANGA_SEE123:
        return new MangaSee123Parser(url);
      case HOSTNAME.MANGA_TAAD:
        return new TaadParser(url);
      case HOSTNAME.MANGA_REAPER_SCANS:
        return new ReaperScansParser(url);
      case HOSTNAME.MANGA_ASURA_SCANS:
        return new AsuraScansParser(url);
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
