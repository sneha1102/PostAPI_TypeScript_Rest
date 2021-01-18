import { Document, Schema, model, Model } from "mongoose";

export interface UserModel extends Document {
  name: string;
}

//User Schema
const userSchema: Schema = new Schema({
  name: { type: String, unique: true },
});

const User: Model<UserModel>= model<UserModel>("User", userSchema);
export {User};