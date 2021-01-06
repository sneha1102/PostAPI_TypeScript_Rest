import mongoose from "mongoose";
import { Model, Document } from "mongoose";

export interface UserModel extends Document {
  name: string;
}

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true },
});

const User: Model<UserModel> = mongoose.model<UserModel>("User", userSchema);
export default User;
