import mongoose, { Document, Schema } from "mongoose";
import { IManga } from "./MangaModel";

export interface IChapter extends Document {
  manga: IManga;
  url: string;
  numer: string;
}

export const ChapterSchema = new Schema({
  manga: { type: Schema.Types.ObjectId, ref: "Manga" },
  url: { type: String, required: true },
  numer: { type: String, required: true },
});

export const ChapterModel = mongoose.model<IChapter>("Chapter", ChapterSchema);
