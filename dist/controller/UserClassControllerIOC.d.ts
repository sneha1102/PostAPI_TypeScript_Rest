import { UserModel } from "../model/user";
import { MessageModel } from "../model/message";
export declare class UserClassControllerIOC {
    private injectedService;
    addNewUser(user: UserModel): Promise<UserModel>;
    getUserById(id: string): Promise<UserModel>;
    getAllUser(): Promise<Array<UserModel>>;
    sendMessage(senderId: string, message: MessageModel): Promise<MessageModel>;
    getAllMessageByTime(userId: string): Promise<Array<MessageModel>>;
}
