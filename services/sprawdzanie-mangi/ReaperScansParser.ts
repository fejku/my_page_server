/* eslint-disable class-methods-use-this */
import cheerio from "cheerio";
import * as chrono from "chrono-node";
import MangaParser from "./MangaParser";

class ReaperScansParser extends MangaParser {
  protected getTytul(root: cheerio.Root): string {
    const tytul = root(".text-highlight").first().text();
    return tytul.trim();
  }

  protected getOkladka(root: cheerio.Root): string {
    let okladka = root(".media-content").attr("style") || "";
    okladka = okladka.slice(21, okladka.length - 1);
    return `https://reaperscans.com${okladka}`;
  }

  protected getChaptery(root: cheerio.Root): cheerio.Cheerio {
    return root(".list-item.col-sm-3");
  }

  protected getChapterUrl(root: cheerio.Root, element: cheerio.Element): string {
    const url = root(element).find("a").first().attr("href");
    return url || "";
  }

  protected getChapterDataDodania(root: cheerio.Root, element: cheerio.Element): string {
    const dataDodania = root(element).find(".item-company").text().trim();
    const sparsowanaData = chrono.parseDate(dataDodania);
    return sparsowanaData.toISOString().split("T")[0];
  }

  protected getChapterNumer(root: cheerio.Root, element: cheerio.Element): string {
    const numer = root(element).find("a").first().text();
    return numer.trim();
  }
}

export default ReaperScansParser;
