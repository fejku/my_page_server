import mongoose, { Document, Schema } from "mongoose";

export interface IManga extends Document {
  user: string;
  tytul: string;
  okladka: string;
  url: string;
  aktualnyChapter: string;
  ostatnieOdswiezenie: Date;
}

export const MangaSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  tytul: { type: String, required: true },
  okladka: { type: String, required: true },
  url: { type: String, required: true },
  aktualnyChapter: { type: String, required: true },
  ostatnieOdswiezenie: { type: Date, required: true },
});

export const MangaModel = mongoose.model<IManga>("Manga", MangaSchema);
