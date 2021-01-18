import { ObjectId } from "mongoose";
import {Container} from "typescript-ioc";
import {Errors} from 'typescript-rest';

import {Post, Comment, PostModel, CommentModel} from "../../model";
import {PostService} from '../PostService';

/**
 * Implementation of Post Service
`*/
export class PostServiceImpl implements PostService {
  
  /**
   * Create new post
   * @param post PostModel data
   * @return post PostModel
   */
  public async addNewPost(post: PostModel): Promise<PostModel>{
    try {
      return await Post.create(post);
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }

   /**
     * Update a post
     * @param postId post identity
     * @param post PostModel
     * @return post PostModel
     */
  public async updatePost(postId: string, post: PostModel): Promise<PostModel> {
    try {
      let result: PostModel = await Post.findByIdAndUpdate(postId, post, {
        new: true,
      });
      return result;
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }

   /**
     * delete a post
     * @param postId post identity
     * @return post PostModel
     */
  public async deletePost(postId: string): Promise<PostModel>{
    try {
      let result: PostModel = await Post.findByIdAndDelete(postId);
      return result;
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }

  /**
     * Returns a post
     * @param id post identity
     * @return post PostModel
     */
  public async getPostById(id: string): Promise<PostModel>{
    try {
      let result: PostModel = await Post.findById(id);
      if (!result) {
        throw new Errors.NotFoundError(`Post with postId: ${id} not found`)
      } 
        return result;
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }

  /**
     * Returns array of posts
     * @return array of post PostModel[]
     */
  public async getAllPost(): Promise<PostModel[]> {
    try {
      let result: PostModel[] = await Post.find({});
      if (result.length <= 0) {
        throw new Errors.NotFoundError('No posts is available')
      } 
        return result;
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }

  /**
     * Like a post
     * @param postId post identity
     * @param post PostModel
     * @return post  PostModel
     */
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

      if (!result) {
        throw new Errors.NotFoundError('Post not found');
      }
      return result;
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }

  /**
   * Create new Comment
   * @param postId post identity
   * @param comment CommentModel data
   * @return comment CommentModel
   */
  public async addNewComment(postId: ObjectId, comment: CommentModel): Promise<CommentModel> {
    try {
      comment.postId = postId;
      return await Comment.create(comment);
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }

    /**
     * Returns array of comment
     * @param postId post identity
     * @return array of comment CommentModel[]
     */
  public async getCommentByPostId(postId: ObjectId): Promise<CommentModel[]> {
    try {
      let result: CommentModel[] = await Comment.find({ postId: postId })
        .populate("commentedBy")
        .populate("postId");
      if (result.length <= 0)
      {
         throw new Errors.NotFoundError( `THere is no comment in Post with id:${postId}`);
      }
        return result;
    } catch (err) {
       throw new Errors.BadRequestError(err);
    }
  }
}
Container.bind(PostService).to(PostServiceImpl);
