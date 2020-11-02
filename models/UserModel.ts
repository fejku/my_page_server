import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  role: "user" | "admin";
}

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
});

export const UserModel = mongoose.model<IUser>("User", UserSchema);
