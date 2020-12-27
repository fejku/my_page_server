/* eslint-disable class-methods-use-this */
import cheerio from "cheerio";
import MangaParser from "./MangaParser";

class FanFoxParser extends MangaParser {
  protected getTytul(root: cheerio.Root): string {
    const tytul = root(".detail-info-right-title-font").text();
    return tytul;
  }

  protected getOkladka(root: cheerio.Root): string {
    const okladka = root(".detail-info-cover-img").attr("src");
    return okladka || "";
  }

  protected getChaptery(root: cheerio.Root): cheerio.Cheerio {
    return root(".detail-main-list li");
  }

  protected getChapterUrl(root: cheerio.Root, element: cheerio.Element): string {
    const url = root(element).find("a").attr("href");
    return url ? `http://fanfox.net${url}` : "";
  }
  protected getChapterDataDodania(root: cheerio.Root, element: cheerio.Element): string {
    const dataDodania = root(element).find(".title2").text();
    return dataDodania;
  }

  protected getChapterNumer(root: cheerio.Root, element: cheerio.Element): string {
    const numer = root(element).find(".title3").text();
    return numer;
  }
}

export default FanFoxParser;
