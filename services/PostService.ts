import { ObjectId } from "mongoose";

import { Container } from "typescript-ioc";

import { Post, Comment, PostModel, CommentModel } from "../model/index";

export abstract class PostService {
  public abstract addNewPost(
    user: PostModel
  ): //file: Express.Multer.File
  Promise<PostModel>;
  public abstract updatePost(
    postId: string,
    post: PostModel
  ): Promise<PostModel>;
  public abstract deletePost(postId: string): Promise<PostModel>;
  public abstract getPostById(id: string): Promise<PostModel>;
  public abstract getAllPost(): Promise<Array<PostModel>>;
  public abstract likePost(postId: string, post: PostModel): Promise<PostModel>;
  public abstract addNewComment(
    postId: ObjectId,
    comment: CommentModel
  ): Promise<CommentModel>;
  public abstract getCommentByPostId(
    postId: ObjectId
  ): Promise<Array<CommentModel>>;
}

//implementation of interface

export class PostServiceImpl implements PostService {
  //to add new post

  public addNewPost(
    post: PostModel
    // file: Express.Multer.File
  ): Promise<PostModel> {
    try {
      // console.log(file);
      return Post.create(post);
    } catch (err) {
      return err;
    }
  }

  //to update a post

  public async updatePost(postId: string, post: PostModel): Promise<PostModel> {
    try {
      const result = await Post.findByIdAndUpdate(postId, post, { new: true });
      return result;
    } catch (err) {
      return err;
    }
  }

  //to delete a post
  public async deletePost(postId: string): Promise<PostModel> {
    try {
      const result = await Post.findByIdAndDelete(postId);
      return result;
    } catch (err) {
      return err;
    }
  }

  //to get post by id

  public async getPostById(id: string): Promise<PostModel> {
    try {
      return await Post.findById(id);
    } catch (err) {
      return err;
    }
  }

  //to get all post

  public async getAllPost(): Promise<Array<PostModel>> {
    try {
      return await Post.find({});
    } catch (err) {
      return err;
    }
  }

  //to like a post

  public async likePost(postId: string, post: PostModel): Promise<PostModel> {
    try {
      let result: PostModel;
      let userId: ObjectId = post.postedBy;
      result = await Post.findByIdAndUpdate(
        postId,
        {
          $inc: { likes: 1 },
          $push: {
            likeDetails: {
              $each: [
                {
                  likedBy: userId,
                },
              ],
              $position: 0,
            },
          },
        },
        { new: true }
      );

      return result;
    } catch (err) {
      return err;
    }
  }

  //to add a comment to a post

  public async addNewComment(
    postId: ObjectId,
    comment: CommentModel
  ): Promise<CommentModel> {
    try {
      comment.postId = postId;
      return Comment.create(comment);
    } catch (err) {
      return err;
    }
  }

  //to get all comment of particular post

  public async getCommentByPostId(
    postId: ObjectId
  ): Promise<Array<CommentModel>> {
    try {
      let res = await Comment.find({ postId: postId })
        .populate("commentedBy")
        .populate("postId");
      return res;
    } catch (err) {
      return err;
    }
  }
}
Container.bind(PostService).to(PostServiceImpl);
