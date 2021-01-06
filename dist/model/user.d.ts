import mongoose from "mongoose";
import { Document } from "mongoose";
export interface UserModel extends Document {
    name: string;
}
declare const _default: mongoose.Model<UserModel>;
export default _default;
