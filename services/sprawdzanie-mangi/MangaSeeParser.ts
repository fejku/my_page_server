/* eslint-disable class-methods-use-this */
import cheerio from "cheerio";
import MangaParser from "./MangaParser";

class MangaSeeParser extends MangaParser {
  protected getTytul(root: cheerio.Root): string {
    const tytul = root(".name").first().text();
    return tytul;
  }

  protected getOkladka(root: cheerio.Root): string {
    const okladka = root(".BoxBody").attr("src");
    return okladka || "";
  }

  protected getChaptery(root: cheerio.Root): cheerio.Cheerio {
    return root(".d48 tr").not(".d49");
  }

  protected getChapterUrl(root: cheerio.Root, element: cheerio.Element): string {
    const url = root(element).find("a").attr("href");
    return url ? `https://www.mangareader.net${url}` : "";
  }
  protected getChapterDataDodania(root: cheerio.Root, element: cheerio.Element): string {
    const dataDodania = root(element).find("td").eq(1).text();
    return dataDodania;
  }

  protected getChapterNumer(root: cheerio.Root, element: cheerio.Element): string {
    let numer = "";

    const url = root(element).find("a").attr("href");

    if (url) {
      [, , numer] = url.split("/");
    }

    return numer || "";
  }
}

export default MangaSeeParser;
