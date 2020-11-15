import express from "express";
import { PosilekModel } from "../../models/apps/posilki/PosilekModel";
import { TagModel } from "../../models/apps/posilki/TagModel";

class PosilkiController {
  public getAllPosilki = async (request: express.Request, response: express.Response) => {
    try {
      const posilki = await PosilekModel.find().populate({ path: "tagi", Model: TagModel });
      response.send(posilki);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu posiłków: ${error}` });
    }
  };
}

export default PosilkiController;
