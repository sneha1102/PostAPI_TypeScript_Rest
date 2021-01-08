import { Document, Schema, model } from "mongoose";

export interface CommentModel extends Document {
  postId: Schema.Types.ObjectId;
  comment: string;
  commentedBy: Schema.Types.ObjectId;
}

const commentSchema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    comment: String,
    commentedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export default model<CommentModel>("Comment", commentSchema);
