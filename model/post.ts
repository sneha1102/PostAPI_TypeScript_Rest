import { Document, Schema, model } from "mongoose";

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

const postSchema: Schema = new Schema(
  {
    postName: String,
    description: String,
    image: String,
    postedBy: { type: Schema.Types.ObjectId },
    likes: Number,
    likeDetails: [
      {
        likedBy: { type: Schema.Types.ObjectId },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<PostModel>("Post", postSchema);
