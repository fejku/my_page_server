import express from "express";
import { IPotrawa, PotrawaModel } from "../../../models/apps/posilki/PotrawaModel";
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

  public getPotraweById = async (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    try {
      const potrawa = await PotrawaModel.findById(id).populate({ path: "tagi", Model: TagModel });
      response.send(potrawa);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy pobieraniu potrawy: ${error}` });
    }
  };

  public createPotrawe = async (request: express.Request, response: express.Response) => {
    const potrawaData: IPotrawa = request.body;

    const createdPotrawa = new PotrawaModel(potrawaData);
    try {
      const savedPotrawa = await createdPotrawa.save();
      response.status(201).send(savedPotrawa);
    } catch (error) {
      response.status(500).json({ message: `Błąd przy tworzeniu potrawy: ${error}` });
    }
  };

  public deletePotrawe = async (request: express.Request, response: express.Response) => {
    const { id } = request.params;
    try {
      await PotrawaModel.findByIdAndDelete(id);
      response.json({ message: "Usunięto potrawę" });
    } catch (error) {
      response.status(500).json({ message: `Błąd przy usuwaniu potrawy: ${error}` });
    }
  };
}

export default PotrawyController;
