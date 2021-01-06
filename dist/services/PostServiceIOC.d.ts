import { ObjectId } from "mongoose";
import { PostModel } from "../model/post";
import { CommentModel } from "../model/comment";
export declare abstract class PostService {
    abstract addNewPost(user: PostModel): Promise<PostModel>;
    abstract updatePost(postId: string, post: PostModel): Promise<PostModel>;
    abstract deletePost(postId: string): Promise<PostModel>;
    abstract getPostById(id: string): Promise<PostModel>;
    abstract getAllPost(): Promise<Array<PostModel>>;
    abstract likePost(postId: string, post: PostModel): Promise<PostModel>;
    abstract addNewComment(postId: ObjectId, comment: CommentModel): Promise<CommentModel>;
    abstract getCommentByPostId(postId: ObjectId): Promise<Array<CommentModel>>;
}
export declare class PostServiceImpl implements PostService {
    addNewPost(post: PostModel): Promise<PostModel>;
    updatePost(postId: string, post: PostModel): Promise<PostModel>;
    deletePost(postId: string): Promise<PostModel>;
    getPostById(id: string): Promise<PostModel>;
    getAllPost(): Promise<Array<PostModel>>;
    likePost(postId: string, post: PostModel): Promise<PostModel>;
    addNewComment(postId: ObjectId, comment: CommentModel): Promise<CommentModel>;
    getCommentByPostId(postId: ObjectId): Promise<Array<CommentModel>>;
}
