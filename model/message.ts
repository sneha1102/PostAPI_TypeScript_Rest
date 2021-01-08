import { Document, Schema, model } from "mongoose";
import { UserModel } from "./user";

export interface MessageModel extends Document {
  roomId: string;
  message: string;
  senderId: UserModel["_id"];
  receiverId: UserModel["_id"];
}

const messageSchema: Schema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, index: true },
    message: String,
    receiverId: { type: Schema.Types.ObjectId, index: true },
    roomId: String,
  },
  {
    timestamps: true,
  }
);

let Message = model<MessageModel>("Message", messageSchema);
export default Message;
