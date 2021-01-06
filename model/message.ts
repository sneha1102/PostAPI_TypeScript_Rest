import mongoose from "mongoose";
import { Document } from "mongoose";
import { UserModel } from "./user";

export interface MessageModel extends Document {
  roomId: string;
  message: string;
  senderId: UserModel["_id"];
  receiverId: UserModel["_id"];
}

const messageSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, index: true },
    message: String,
    receiverId: { type: mongoose.Schema.Types.ObjectId, index: true },
    roomId: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<MessageModel>("Message", messageSchema);
