import mongoose from "mongoose";
import { Document } from "mongoose";
//import { UserModel } from "./user";
//import { PostModel } from "./post";

export interface CommentModel extends Document {
  //postId: PostModel["_id"];
  postId: mongoose.Schema.Types.ObjectId;
  comment: string;
  // commentedBy: UserModel["_id"];
  commentedBy: mongoose.Schema.Types.ObjectId;
}

const commentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
    comment: String,
    commentedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<CommentModel>("Comment", commentSchema);
