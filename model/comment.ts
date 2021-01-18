import { Document, Schema, model, Model } from "mongoose";

export interface CommentModel extends Document {
  postId: Schema.Types.ObjectId;
  comment: string;
  commentedBy: Schema.Types.ObjectId;
}

//Comment Schema
const commentSchema: Schema = new Schema(
  {
    postId: { type: Schema.Types.ObjectId, ref: "Post" },
    comment: String,
    commentedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Comment : Model<CommentModel> = model<CommentModel>("Comment", commentSchema);
export {Comment};