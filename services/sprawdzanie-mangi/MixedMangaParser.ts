/* eslint-disable class-methods-use-this */
import cheerio from "cheerio";
import * as chrono from "chrono-node";
import MangaParser from "./MangaParser";

class MixedMangaParser extends MangaParser {
  protected getTytul(root: cheerio.Root): string {
    const tytul = root(".post-title").text();
    return tytul.trim();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getOkladka(root: cheerio.Root): string {
    // let okladka = root(".media-content").attr("style") || "";
    // okladka = okladka.slice(21, okladka.length - 1);
    // return `https://reaperscans.com${okladka}`;
    return "";
  }

  protected getChaptery(root: cheerio.Root): cheerio.Cheerio {
    return root(".listing-chapters_wrap>ul");
  }

  protected getChapterUrl(root: cheerio.Root, element: cheerio.Element): string {
    const url = root(element).find("a").first().attr("href");
    return url || "";
  }

  protected getChapterDataDodania(root: cheerio.Root, element: cheerio.Element): string {
    const dataDodania = root(element).find(".chapter-release-date a").attr("title");
    // const sparsowanaData = chrono.parseDate(dataDodania);
    return dataDodania!.trim();
  }

  protected getChapterNumer(root: cheerio.Root, element: cheerio.Element): string {
    const numer = root(element).find("a").first().text().trim().replace("Chapter ", "");
    return numer;
  }
}

export default MixedMangaParser;
