import express from "express";
import { TagModel } from "../../../models/apps/posilki/TagModel";

class TagiController {
  public getAllTagi = async (request: express.Request, response: express.Response) => {
    try {
      const tagi = await TagModel.find();
      response.send(tagi);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu tagów: ${error}` });
    }
  };
}

export default TagiController;
