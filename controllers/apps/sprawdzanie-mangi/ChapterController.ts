import express from "express";
import cloudscraper from "cloudscraper";
import cheerio from "cheerio";
import { ChapterModel } from "../../../models/apps/sprawdzanie-mangi/ChapterModel";
import IPobieranieChapterowWynikDTO, {
  IPobieranieChapterowChapterDTO,
} from "../../../interfaces/IPobieranieChapterowWynikDTO";

class ChapterController {
  public getAll = async (request: express.Request, response: express.Response) => {
    try {
      const chaptery = await ChapterModel.find();
      response.send(chaptery);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu chapterów: ${error}` });
    }
  };

  public getChapteryByUrl = async (request: express.Request, response: express.Response) => {
    try {
      const { url } = request.body;

      const res = await cloudscraper.get(url);
      const body = await res;
      const $ = cheerio.load(body);

      const nazwaMangi = $("#information img").first().attr("alt")!;

      const chaptery = <IPobieranieChapterowChapterDTO[]>[];
      $("#chapter_table .chico").each((i, e) => {
        const chapter: IPobieranieChapterowChapterDTO = {
          url: $(e).attr("href")!,
          numer: $(e).find("b").html()!,
          kolejnosc: i,
        };
        chaptery.push(chapter);
      });
      const result: IPobieranieChapterowWynikDTO = { nazwaMangi, chaptery };

      response.send(result);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu chapterów: ${error}` });
    }
  };
}

export default ChapterController;
