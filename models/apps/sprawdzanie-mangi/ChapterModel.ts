import mongoose, { Document, Schema } from "mongoose";

export interface IChapter extends Document {
  manga: string;
  url: string;
  numer: string;
  kolejnosc: number;
}

export const ChapterSchema = new Schema({
  manga: { type: Schema.Types.ObjectId, ref: "Manga" },
  url: { type: String, required: true },
  numer: { type: String, required: true },
  kolejnosc: { type: Number, required: true },
});

export const ChapterModel = mongoose.model<IChapter>("Chapter", ChapterSchema);
