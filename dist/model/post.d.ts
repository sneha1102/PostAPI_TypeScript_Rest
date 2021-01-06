import mongoose from "mongoose";
import { Document } from "mongoose";
import { UserModel } from "./user";
export interface PostModel extends Document {
    postName: String;
    description: String;
    image: String;
    postedBy: UserModel["_id"];
    likes: Number;
    likeDetails: [
        {
            likedBy: UserModel["_id"];
        }
    ];
}
declare const _default: mongoose.Model<PostModel>;
export default _default;
