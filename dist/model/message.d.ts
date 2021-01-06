import mongoose from "mongoose";
import { Document } from "mongoose";
import { UserModel } from "./user";
export interface MessageModel extends Document {
    roomId: string;
    message: string;
    senderId: UserModel["_id"];
    receiverId: UserModel["_id"];
}
declare const _default: mongoose.Model<MessageModel>;
export default _default;
