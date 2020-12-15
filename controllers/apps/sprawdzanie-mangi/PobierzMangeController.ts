import express from "express";
import fs from "fs";
import cheerio from "cheerio";
// import cloudscraper from "cloudscraper";

class PobierzMangeController {
  public pobierz = async (request: express.Request, response: express.Response) => {
    // const res = await cloudscraper
    // .get(`http://www.mangago.me/read-manga/i_am_the_sorcerer_king/`);
    // const body = await res;
    const body = fs.readFileSync("controllers/apps/sprawdzanie-mangi/test.txt");
    const $ = cheerio.load(body);
    const nazwaMangi = $("#information img").first().attr("alt");
    console.log(nazwaMangi);
    $("#chapter_table .chico").each((i, e) => {
      if (i < 3) {
        console.log($(e).attr("href"));
        console.log($(e).find("b").html());
      }
    });

    response.send();
    // try {
    //   const tagi = await TagModel.find();
    //   response.send(tagi);
    // } catch (error) {
    //   response.status(500).json({ message: `Błąd przy pobieraniu tagów: ${error}` });
    // }
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

export default PobierzMangeController;