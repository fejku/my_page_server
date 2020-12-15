import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../../UserModel";

export interface IManga extends Document {
  nazwa: string;
  url: string;
  user: IUser;
  ostatniChapter: string;
}

export const MangaSchema = new Schema({
  nazwa: { type: String, required: true },
  url: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  ostatniChapter: { type: String },
});

export const MangaModel = mongoose.model<IManga>("Manga", MangaSchema);
