import { UserModel } from "../model/user";
import { MessageModel } from "../model/message";
import { ObjectId } from "mongoose";
export declare class UserClassController {
    addNewUser(user: UserModel): Promise<UserModel>;
    getUserById(id: string): Promise<UserModel>;
    getAllUser(): Promise<Array<UserModel>>;
    sendMessage(senderId: ObjectId, message: MessageModel): Promise<MessageModel>;
    getAllMessageByTime(userId: string): Promise<Array<MessageModel>>;
}
