import { Document, Schema, model, Model } from "mongoose";
import { UserModel } from "./user";

export interface MessageModel extends Document {
  roomId: string;
  message: string;
  senderId: UserModel["_id"];
  receiverId: UserModel["_id"];
}

//Message Schema 
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

const Message : Model<MessageModel> = model<MessageModel>("Message", messageSchema);
export {Message};
