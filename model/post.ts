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

const postSchema = new mongoose.Schema(
  {
    postName: String,
    description: String,
    image: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId },
    likes: Number,
    likeDetails: [
      {
        likedBy: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<PostModel>("Post", postSchema);
