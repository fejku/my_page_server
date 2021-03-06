import express from "express";
import IZapisanieMangiKryteriaDTO from "../../../interfaces/sprawdzanie-mangi/IZapisanieMangiKryteriaDTO";
import { ChapterModel, IChapter } from "../../../models/apps/sprawdzanie-mangi/ChapterModel";
import { MangaModel } from "../../../models/apps/sprawdzanie-mangi/MangaModel";
import { IUser } from "../../../models/UserModel";
import IOdswiezenieMangiWynikDTO from "../../../interfaces/sprawdzanie-mangi/IOdswiezenieMangiWynikDTO";
import IPobieranieMangiKryteriaDTO from "../../../interfaces/sprawdzanie-mangi/IPobieranieMangiKryteriaDTO";
import MangaParserFactory from "../../../services/sprawdzanie-mangi/MangaParserFactory";

class MangaController {
  public getAll = async (request: express.Request, response: express.Response) => {
    try {
      const { _id } = <IUser>request.user;
      const mangi = await MangaModel.find({ user: _id });

      const result = [];
      for (const manga of mangi) {
        const najnowszyChapter = await ChapterModel.findOne({ manga: manga._id }).sort({ kolejnosc: -1 });
        result.push({ ...manga.toObject(), najnowszyChapter: najnowszyChapter ? najnowszyChapter.numer : "-" });
      }
      response.send(result);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu mang: ${error}` });
    }
  };

  public getAllChapters = async (request: express.Request, response: express.Response) => {
    try {
      const { id } = request.params;
      const chaptery = await ChapterModel.find({ manga: id });
      response.send(chaptery.sort((a, b) => a.kolejnosc - b.kolejnosc));
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu mang: ${error}` });
    }
  };

  public create = async (request: express.Request, response: express.Response) => {
    try {
      const { _id } = <IUser>request.user;
      const { manga, chaptery }: IZapisanieMangiKryteriaDTO = request.body;

      const ostatniaManga = await MangaModel.findOne().sort("-kolejnosc");

      let maxKolejnosc = 0;
      if (ostatniaManga) {
        maxKolejnosc = ostatniaManga.kolejnosc;
      }

      const createdManga = new MangaModel({
        user: _id,
        tytul: manga.tytul,
        okladka: manga.okladka,
        url: manga.url,
        aktualnyChapter: manga.aktualnyChapter,
        ostatnieOdswiezenie: new Date(),
        kolejnosc: maxKolejnosc + 1,
      });
      const savedManga = await createdManga.save();

      // eslint-disable-next-line no-restricted-syntax
      for (const chapter of chaptery) {
        const createdChapter = new ChapterModel({
          manga: savedManga._id, // eslint-disable-line no-underscore-dangle
          url: chapter.url,
          dataDodania: chapter.dataDodania,
          numer: chapter.numer,
          kolejnosc: chapter.kolejnosc,
        });

        await createdChapter.save(); // eslint-disable-line no-await-in-loop
      }

      response.status(201).send({ tytul: savedManga.tytul });
    } catch (error) {
      response.status(500).send({ message: `Błąd podczas zapisywania mangi: ${error}` });
    }
  };

  public pobierzDane = async (request: express.Request, response: express.Response) => {
    try {
      const { url }: IPobieranieMangiKryteriaDTO = request.body;

      const mangaParser = MangaParserFactory.getParser(url);
      const parsedManga = await mangaParser.parse();

      response.send(parsedManga);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu danych mangi: ${error}` });
    }
  };

  public odswiez = async (request: express.Request, response: express.Response) => {
    try {
      const { id } = request.params;

      const manga = await MangaModel.findById(id);

      if (manga) {
        await ChapterModel.deleteMany({ manga: id });

        const mangaParser = MangaParserFactory.getParser(manga.url);
        const parsedManga = await mangaParser.parse();

        const dodaneChaptery = <IChapter[]>[];
        // eslint-disable-next-line no-restricted-syntax
        for (const chapter of parsedManga.chaptery) {
          const dodanyChapter = new ChapterModel({
            manga: manga._id, // eslint-disable-line no-underscore-dangle
            url: chapter.url,
            dataDodania: chapter.dataDodania,
            numer: chapter.numer,
            kolejnosc: chapter.kolejnosc,
          });
          dodaneChaptery.push(dodanyChapter);
        }

        const zapisaneChaptery = await Promise.all(dodaneChaptery.map((dodanyChapter) => dodanyChapter.save()));

        manga.ostatnieOdswiezenie = new Date();
        await manga.save();

        const result: IOdswiezenieMangiWynikDTO = {
          chaptery: zapisaneChaptery.sort((a, b) => a.kolejnosc - b.kolejnosc),
          ostatnieOdswiezenie: manga.ostatnieOdswiezenie,
        };

        response.send(result);
      }
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu chapterów: ${error}` });
    }
  };

  public edit = async (request: express.Request, response: express.Response) => {
    const { id } = request.params;

    try {
      const zedtowanaManga = await MangaModel.findByIdAndUpdate(id, request.body, { new: true });

      response.status(201).send(zedtowanaManga);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy usuwaniu taga: ${error}` });
    }
  };

  public delete = async (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    try {
      await ChapterModel.deleteMany({ manga: id });
      await MangaModel.findByIdAndDelete(id);

      response.status(201).send();
    } catch (error) {
      response.status(500).json({ message: `Błąd przy usuwaniu taga: ${error}` });
    }
  };
}

export default MangaController;
