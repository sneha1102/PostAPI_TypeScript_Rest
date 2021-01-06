import mongoose from "mongoose";
import { Document } from "mongoose";
export interface CommentModel extends Document {
    postId: mongoose.Schema.Types.ObjectId;
    comment: string;
    commentedBy: mongoose.Schema.Types.ObjectId;
}
declare const _default: mongoose.Model<CommentModel>;
export default _default;
