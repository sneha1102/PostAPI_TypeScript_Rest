import { PostModel } from "../model/post";
export declare class PostService {
    addNewPost(post: PostModel): Promise<PostModel>;
}
