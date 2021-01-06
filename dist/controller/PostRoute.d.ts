import { PostModel } from "../model/post";
import { ObjectId } from "mongoose";
import { CommentModel } from "../model/comment";
export declare class PostClassController {
    addNewPost(post: PostModel): Promise<PostModel>;
    updatePost(postId: ObjectId, post: PostModel): Promise<PostModel>;
    deletePost(postId: string): Promise<PostModel>;
    getPostById(id: string): Promise<PostModel>;
    getAllPost(): Promise<Array<PostModel>>;
    likePost(postId: ObjectId, post: PostModel): Promise<PostModel>;
    addNewComment(postId: ObjectId, comment: CommentModel): Promise<CommentModel>;
    getCommentByPostId(postId: ObjectId): Promise<Array<CommentModel>>;
}
