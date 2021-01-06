import { Model, Document } from "mongoose";
export interface UserModel extends Document {
    name: string;
}
declare const User: Model<UserModel>;
export default User;
