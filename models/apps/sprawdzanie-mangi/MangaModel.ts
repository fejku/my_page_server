import mongoose, { Document, Schema } from "mongoose";

export interface IManga extends Document {
  nazwa: string;
  url: string;
  user: string;
  ostatniChapter: string;
  ostatnieOdswiezenie: Date;
}

export const MangaSchema = new Schema({
  nazwa: { type: String, required: true },
  url: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  ostatniChapter: { type: String, required: true },
  ostatnieOdswiezenie: { type: Date, required: true },
});

export const MangaModel = mongoose.model<IManga>("Manga", MangaSchema);
