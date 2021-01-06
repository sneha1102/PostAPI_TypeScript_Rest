import { ObjectId } from "mongoose";
import { PostModel } from "../model/post";
import { CommentModel } from "../model/comment";
export declare class PostService {
    addNewPost(post: PostModel): Promise<PostModel>;
    updatePost(postId: string, post: PostModel): Promise<PostModel>;
    deletePost(postId: string): Promise<PostModel>;
    getPostById(id: string): Promise<PostModel>;
    getAllPost(): Promise<Array<PostModel>>;
    likePost(postId: string, post: PostModel): Promise<PostModel>;
    addNewComment(postId: ObjectId, comment: CommentModel): Promise<CommentModel>;
    getCommentByPostId(postId: ObjectId): Promise<Array<CommentModel>>;
}
