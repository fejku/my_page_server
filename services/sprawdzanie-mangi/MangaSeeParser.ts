/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import axios from "axios";
import cheerio from "cheerio";
import IPobieranieMangiWynikDTO, {
  IPobieranieMangiWynikDTOChapter,
} from "../../interfaces/sprawdzanie-mangi/IPobieranieMangiWynikDTO";

interface IWynikPobieraniaChapterow {
  Chapter: string;
  Type: string;
  Date: string;
  ChapterName: string | null;
}

class MangaSeeParser {
  constructor(protected readonly url: string) {} // eslint-disable-line no-empty-function

  private getTytul(root: cheerio.Root): string {
    const tytul = root(".BoxBody > div").eq(1).find("div").eq(1).children().html()!.trim();
    return tytul;
  }

  private getOkladka(root: cheerio.Root): string {
    const okladka = root(".BoxBody > div").eq(1).find("img").attr("src");
    return okladka || "";
  }

  private getChaptery(data: string): IWynikPobieraniaChapterow[] {
    const pattern = /(vm\.Chapters = \[{).+]/;
    const chaptery = data.match(pattern)![0].slice("vm.Chapters = ".length);
    return JSON.parse(chaptery);
  }

  private getChapterNumer = (chapter: string) => {
    const chapterFullNumber = parseInt(chapter.slice(1, -1), 10);
    const chapterHalfNumber = parseInt(chapter[chapter.length - 1], 10);

    if (chapterHalfNumber === 0) {
      return chapterFullNumber.toString();
    }
    return `${chapterFullNumber}.${chapterHalfNumber}`.toString();
  };

  private getChapterURL = (chapter: string) => {
    let indexResult = "";
    const indexNumber = parseInt(chapter.substring(0, 1), 10);

    if (indexNumber !== 1) {
      indexResult = `-index-${indexNumber}`;
    }

    const chapterFullNumber = parseInt(chapter.slice(1, -1), 10);
    let chapterHalfNumberResult = "";
    const chapterHalfNumber = parseInt(chapter[chapter.length - 1], 10);

    if (chapterHalfNumber !== 0) {
      chapterHalfNumberResult = `.${chapterHalfNumber}`;
    }
    return `-chapter-${chapterFullNumber}${chapterHalfNumberResult}${indexResult}.html`;
  };

  async parse(): Promise<IPobieranieMangiWynikDTO> {
    const responseManga = await axios.get(this.url);
    const { data } = responseManga;
    const $ = cheerio.load(data);

    const tytul = this.getTytul($);
    const okladka = this.getOkladka($);

    const listaChapterow = this.getChaptery(data);
    const chapteryWynik = <IPobieranieMangiWynikDTOChapter[]>[];
    listaChapterow.forEach((el, i) => {
      const url = this.getChapterURL(el.Chapter);
      const dataDodania = el.Date.slice(0, -9);
      const numer = this.getChapterNumer(el.Chapter);
      const kolejnosc = listaChapterow.length - 1 - i;

      chapteryWynik.push({
        url,
        dataDodania,
        numer,
        kolejnosc,
      });
    });

    return {
      manga: {
        tytul,
        okladka,
      },
      chaptery: chapteryWynik.sort((a, b) => a.kolejnosc - b.kolejnosc),
    };
  }
}

export default MangaSeeParser;
