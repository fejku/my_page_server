/* eslint-disable class-methods-use-this */
import cheerio from "cheerio";
import MangaParser from "./MangaParser";

class TaadParser extends MangaParser {
  protected getTytul(root: cheerio.Root): string {
    const tytul = root(".cmtList table table h1").text().slice(0, -6);
    return tytul;
  }

  protected getOkladka(root: cheerio.Root): string {
    const okladka = root(".cmtList table td img").attr("src");
    return okladka || "";
  }

  protected getChaptery(root: cheerio.Root): cheerio.Cheerio {
    return root(".chapter_list tr").slice(1);
  }

  protected getChapterUrl(root: cheerio.Root, element: cheerio.Element): string {
    const url = root(element).find("a").attr("href");
    return url ? `https://www.taadd.com${url}` : "";
  }

  protected getChapterDataDodania(root: cheerio.Root, element: cheerio.Element): string {
    const dataDodania = root(element).find("td").eq(1).text();
    const sparsowanaDataDodania = `${dataDodania.split(",")[1].trim()}, ${dataDodania.split(",")[2].trim()}`;
    return sparsowanaDataDodania;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getChapterNumer(root: cheerio.Root, element: cheerio.Element): string {
    const tytulZChapterem = root(element).find("td").eq(0).text();

    return tytulZChapterem.slice(this.getTytul(root).length + 1);
  }
}

export default TaadParser;
