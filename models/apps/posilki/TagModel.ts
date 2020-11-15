import mongoose, { Document, Schema } from "mongoose";

export interface ITag extends Document {
  nazwa: String;
}

export const TagSchema = new Schema({
  nazwa: { type: String, required: true },
});

export const TagModel = mongoose.model<ITag>("Tag", TagSchema, "tagi");
