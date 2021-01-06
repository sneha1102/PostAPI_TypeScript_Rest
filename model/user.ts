import mongoose from "mongoose";
import { Document } from "mongoose";

export interface UserModel extends Document {
  name: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

export default mongoose.model<UserModel>("User", userSchema);
