import express from "express";
import { PotrawaModel } from "../../../models/apps/posilki/PotrawaModel";
import { TagModel } from "../../../models/apps/posilki/TagModel";

class PotrawyController {
  public getAllPotrawy = async (request: express.Request, response: express.Response) => {
    try {
      const potrawy = await PotrawaModel.find().populate({ path: "tagi", Model: TagModel });
      response.send(potrawy);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu potraw: ${error}` });
    }
  };
}

export default PotrawyController;
