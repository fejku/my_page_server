/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-constructor */
import axios from "axios";
import cheerio from "cheerio";
import IPobieranieMangiWynikDTO, {
  IPobieranieMangiWynikDTOChapter,
} from "../../interfaces/sprawdzanie-mangi/IPobieranieMangiWynikDTO";

abstract class MangaParser {
  constructor(protected readonly url: string) {} // eslint-disable-line no-empty-function
  protected abstract getTytul(root: cheerio.Root): string;
  protected abstract getOkladka(root: cheerio.Root): string;
  protected abstract getChaptery(root: cheerio.Root): cheerio.Cheerio;
  protected abstract getChapterUrl(root: cheerio.Root, element: cheerio.Element): string;
  protected abstract getChapterDataDodania(root: cheerio.Root, element: cheerio.Element): string;
  protected abstract getChapterNumer(root: cheerio.Root, element: cheerio.Element): string;

  protected getCzyListaChapterowOdNajnowszego() {
    return true;
  }

  private getKolejnosc(iloscElementow: number, index: number) {
    if (this.getCzyListaChapterowOdNajnowszego()) {
      return iloscElementow - 1 - index;
    }
    return index;
  }

  async parse(): Promise<IPobieranieMangiWynikDTO> {
    const responseManga = await axios.get(this.url);
    const { data } = responseManga;
    const $ = cheerio.load(data);

    const tytul = this.getTytul($);
    const okladka = this.getOkladka($);

    const chaptery = <IPobieranieMangiWynikDTOChapter[]>[];
    this.getChaptery($).each((i, el) => {
      const url = this.getChapterUrl($, el);
      const dataDodania = this.getChapterDataDodania($, el);
      const numer = this.getChapterNumer($, el);
      const kolejnosc = this.getKolejnosc(this.getChaptery($).length, i);

      chaptery.push({
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
      chaptery: chaptery.sort((a, b) => a.kolejnosc - b.kolejnosc),
    };
  }
}

export default MangaParser;
