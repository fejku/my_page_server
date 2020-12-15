import express from "express";
import { ChapterModel } from "../../../models/apps/sprawdzanie-mangi/ChapterModel";

class ChapterController {
  public getAll = async (request: express.Request, response: express.Response) => {
    try {
      const chaptery = await ChapterModel.find();
      response.send(chaptery);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu chapterów: ${error}` });
    }
  };

  // public getTagById = async (request: express.Request, response: express.Response) => {
  //   const { id } = request.params;
  //   try {
  //     const tag = await TagModel.findById(id);
  //     response.send(tag);
  //   } catch (error) {
  //     response.status(500).json({ message: `Błąd przy pobieraniu taga: ${error}` });
  //   }
  // };

  // public createTag = async (request: express.Request, response: express.Response) => {
  //   const tagData: ITag = request.body;

  //   const createdTag = new TagModel(tagData);
  //   try {
  //     const savedTag = await createdTag.save();
  //     response.status(201).send(savedTag);
  //   } catch (error) {
  //     response.status(500).json({ message: `Błąd przy tworzeniu taga: ${error}` });
  //   }
  // };

  // public deleteTag = async (request: express.Request, response: express.Response) => {
  //   const { id } = request.params;
  //   try {
  //     await TagModel.findByIdAndDelete(id);
  //     response.json({ message: "Usunięto tag" });
  //   } catch (error) {
  //     response.status(500).json({ message: `Błąd przy usuwaniu taga: ${error}` });
  //   }
  // };
}

export default ChapterController;
