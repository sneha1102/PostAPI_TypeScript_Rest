import { ObjectId } from "mongoose";
import { Container } from "typescript-ioc";

import { Post, Comment, PostModel, CommentModel } from "../model/index";

export abstract class PostService {
  public abstract addNewPost(user: PostModel): Object;
  public abstract updatePost(postId: string, post: PostModel): Promise<Object>;
  public abstract deletePost(postId: string): Promise<Object>;
  public abstract getPostById(id: string): Promise<Object>;
  public abstract getAllPost(): Promise<Object>;
  public abstract likePost(postId: string, post: PostModel): Promise<Object>;
  public abstract addNewComment(
    postId: ObjectId,
    comment: CommentModel
  ): Object;
  public abstract getCommentByPostId(postId: ObjectId): Promise<Object>;
}

//implementation of interface
export class PostServiceImpl implements PostService {
  //to add new post
  public addNewPost(post: PostModel): Object {
    try {
      Post.create(post);
      return { message: "Post created successfully" };
    } catch (err) {
      return { Error: err };
    }
  }

  //to update a post
  public async updatePost(postId: string, post: PostModel): Promise<Object> {
    try {
      let result: PostModel = await Post.findByIdAndUpdate(postId, post, {
        new: true,
      });
      return { message: "Post updated successfully", Post: result };
    } catch (err) {
      return { Error: err };
    }
  }

  //to delete a post
  public async deletePost(postId: string): Promise<Object> {
    try {
      let result: PostModel = await Post.findByIdAndDelete(postId);
      return { message: "Post deleted successfully", Post: result };
    } catch (err) {
      return { Error: err };
    }
  }

  //to get post by id
  public async getPostById(id: string): Promise<Object> {
    try {
      let result: PostModel = await Post.findById(id);
      if (!result) {
        return { message: `Post with id:${id} Not Found` };
      } else {
        return { message: "Post found", Post: result };
      }
    } catch (err) {
      return { Error: err };
    }
  }

  //to get all post
  public async getAllPost(): Promise<Object> {
    try {
      let result: PostModel[] = await Post.find({});
      if (result.length <= 0) {
        return { message: "Posts Not Found" };
      } else {
        return { message: "Posts found", Post: result };
      }
    } catch (err) {
      return { Error: err };
    }
  }

  //to like a post
  public async likePost(postId: string, post: PostModel): Promise<Object> {
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

      if (!result) {
        return { message: "Post Not Found" };
      } else {
        return {
          message: `Post with id:${postId} is liked by a user with id:${userId}`,
          Post: result,
        };
      }
    } catch (err) {
      return { Error: err };
    }
  }

  //to add a comment to a post
  public addNewComment(postId: ObjectId, comment: CommentModel): Object {
    try {
      comment.postId = postId;
      Comment.create(comment);
      return { message: "Comment added Successfully" };
    } catch (err) {
      return { Error: err };
    }
  }

  //to get all comment of particular post
  public async getCommentByPostId(postId: ObjectId): Promise<Object> {
    try {
      let result: CommentModel[] = await Comment.find({ postId: postId })
        .populate("commentedBy")
        .populate("postId");
      if (result.length <= 0) {
        return { message: `THere is no comment in Post with id:${postId}` };
      } else {
        return { message: "Comment found", Comment: result };
      }
    } catch (err) {
      return { Error: err };
    }
  }
}
Container.bind(PostService).to(PostServiceImpl);
