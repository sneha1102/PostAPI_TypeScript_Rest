import { UserModel } from "../model/user";
import { MessageModel } from "../model/message";
export declare abstract class UserService {
    abstract addNewUser(user: UserModel): Promise<UserModel>;
    abstract getUserById(id: string): Promise<UserModel>;
    abstract getAllUser(): Promise<Array<UserModel>>;
    abstract sendMessage(senderId: string, message: MessageModel): Promise<MessageModel>;
    abstract getAllMessageByTime(userId: string): Promise<Array<MessageModel>>;
}
export declare class UserServiceImpl implements UserService {
    addNewUser(user: UserModel): Promise<UserModel>;
    getUserById(id: string): Promise<UserModel>;
    getAllUser(): Promise<Array<UserModel>>;
    sendMessage(senderId: string, message: MessageModel): Promise<MessageModel>;
    getAllMessageByTime(userId: string): Promise<Array<MessageModel>>;
}
