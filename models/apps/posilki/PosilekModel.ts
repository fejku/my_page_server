import mongoose, { Document, Schema } from "mongoose";
import { ITag } from "./TagModel";

export interface IPosilek extends Document {
  nazwa: string;
  zdjecie?: string;
  uwagi?: string;
  link?: string;
  tagi?: ITag[];
}

export const PosilekSchema = new Schema({
  nazwa: { type: String, required: true },
  zdjecie: { type: String },
  uwagi: { type: String },
  link: { type: String },
  tagi: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

export const PosilekModel = mongoose.model<IPosilek>("Posilek", PosilekSchema, "potrawy");
