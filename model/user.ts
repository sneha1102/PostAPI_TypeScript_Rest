import { Document, Schema, model } from "mongoose";

export interface UserModel extends Document {
  name: string;
}

const userSchema = new Schema({
  name: { type: String, unique: true },
});

export default model<UserModel>("User", userSchema);
