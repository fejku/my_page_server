import MangaReaderParser from "./MangaReaderParser";

enum HOSTNAME {
  MANGA_READER = "www.mangareader.net",
}

class MangaParserFactory {
  static getParser(url: string) {
    const hostname = this.getHostname(url);

    switch (hostname) {
      case HOSTNAME.MANGA_READER:
        return new MangaReaderParser(url);
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
