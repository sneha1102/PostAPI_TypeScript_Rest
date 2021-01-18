import {ObjectId} from 'mongoose';
import {CommentModel, PostModel} from '../model';

export abstract class PostService
{
  /**
   * Create new post
   * @param post PostModel data
   * @return post PostModel
   */
  public abstract addNewPost (user: PostModel): Promise<PostModel>;
  
     /**
     * Update a post
     * @param postId post identity
     * @param post PostModel
     * @return post PostModel
     */
  public abstract updatePost (postId: string, post: PostModel): Promise<PostModel>;
  
   /**
     * delete a post
     * @param postId post identity
     * @return post PostModel
     */
  public abstract deletePost (postId: string): Promise<PostModel>;
  
   /**
     * Returns a post
     * @param id post identity
     * @return post PostModel
     */
  public abstract getPostById (id: string): Promise<PostModel>;
  
  /**
     * Returns array of posts
     * @return array of post PostModel[]
     */
  public abstract getAllPost (): Promise<PostModel[]>;
  
  /**
     * Like a post
     * @param postId post identity
     * @param post PostModel
     * @return post  PostModel
     */
  public abstract likePost (postId: string, post: PostModel): Promise< PostModel>;
  
  /**
   * Create new Comment
   * @param postId post identity
   * @param comment CommentModel data
   * @return comment CommentModel
   */
  public abstract addNewComment(
    postId: ObjectId,
    comment: CommentModel
  ): Promise<CommentModel>;

  /**
     * Returns array of comment
     * @param postId post identity
     * @return array of comment CommentModel[]
     */
  public abstract getCommentByPostId(postId: ObjectId): Promise<CommentModel[]>;
}
