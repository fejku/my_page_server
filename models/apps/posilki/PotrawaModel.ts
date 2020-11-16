import mongoose, { Document, Schema } from "mongoose";
import { ITag } from "./TagModel";

export interface IPotrawa extends Document {
  nazwa: string;
  zdjecie?: string;
  uwagi?: string;
  link?: string;
  tagi?: ITag[];
}

export const PotrawaSchema = new Schema({
  nazwa: { type: String, required: true },
  zdjecie: { type: String },
  uwagi: { type: String },
  link: { type: String },
  tagi: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

export const PotrawaModel = mongoose.model<IPotrawa>("Potrawa", PotrawaSchema, "potrawy");
