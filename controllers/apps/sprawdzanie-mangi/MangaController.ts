import express from "express";
import IZapisanieMangiKryteriaDTO from "../../../interfaces/IZapisanieMangiKryteriaDTO";
import { ChapterModel } from "../../../models/apps/sprawdzanie-mangi/ChapterModel";
import { MangaModel } from "../../../models/apps/sprawdzanie-mangi/MangaModel";
import { IUser } from "../../../models/UserModel";

class MangaController {
  public getAll = async (request: express.Request, response: express.Response) => {
    try {
      const { _id } = <IUser>request.user;
      const mangi = await MangaModel.find({ user: _id });
      response.send(mangi);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu mang: ${error}` });
    }
  };

  public getAllChapters = async (request: express.Request, response: express.Response) => {
    try {
      const { id } = request.params;
      const chaptery = await ChapterModel.find({ manga: id });
      response.send(chaptery);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu mang: ${error}` });
    }
  };

  public create = async (request: express.Request, response: express.Response) => {
    try {
      const { _id } = <IUser>request.user;
      const { mangaNazwa, mangaUrl, mangaAktualnyChapter, chaptery }: IZapisanieMangiKryteriaDTO = request.body;
      const createdManga = new MangaModel({
        nazwa: mangaNazwa,
        url: mangaUrl,
        user: _id,
        ostatniChapter: mangaAktualnyChapter,
        ostatnieOdswiezenie: Date.now(),
      });
      const savedManga = await createdManga.save();

      // eslint-disable-next-line no-restricted-syntax
      for (const chapter of chaptery) {
        const createdChapter = new ChapterModel({
          manga: savedManga._id, // eslint-disable-line no-underscore-dangle
          url: chapter.url,
          numer: chapter.numer,
          kolejnosc: chaptery.length - 1 - chapter.kolejnosc,
        });

        await createdChapter.save(); // eslint-disable-line no-await-in-loop
      }

      response.status(201).json({ mangaNazwa });
    } catch (error) {
      response.status(500).json({ message: `Błąd przy tworzeniu potrawy: ${error}` });
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
