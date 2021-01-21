/* eslint-disable class-methods-use-this */
import cheerio from "cheerio";
import MangaParser from "./MangaParser";

class AsuraScansParser extends MangaParser {
  protected getTytul(root: cheerio.Root): string {
    const tytul = root(".entry-title").text();
    return tytul;
  }

  protected getOkladka(root: cheerio.Root): string {
    const okladka = root(".thumb img").attr("src");
    return okladka || "";
  }

  protected getChaptery(root: cheerio.Root): cheerio.Cheerio {
    return root("#chapterlist li");
  }

  protected getChapterUrl(root: cheerio.Root, element: cheerio.Element): string {
    const url = root(element).find("a").attr("href");
    return url || "";
  }

  protected getChapterDataDodania(root: cheerio.Root, element: cheerio.Element): string {
    const dataDodania = root(element).find(".chapterdate").text();
    return dataDodania;
  }

  protected getChapterNumer(root: cheerio.Root, element: cheerio.Element): string {
    const numer = root(element).find(".chapternum").text();
    return numer;
  }
}

export default AsuraScansParser;
