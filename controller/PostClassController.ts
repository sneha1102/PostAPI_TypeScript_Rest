import { GET, POST, DELETE, PATCH, PathParam, Path } from "typescript-rest";
import { ObjectId } from "mongoose";
import { Inject } from "typescript-ioc";

import { PostModel, CommentModel } from "../model";
import { PostService } from "../services";

@Path("/posts")
export class PostClassController {
  @Inject
  private injectedService: PostService;

  //to add new post   "/posts"
  @POST
  public async addNewPost(post: PostModel): Promise<PostModel> {
    return this.injectedService.addNewPost(post);
  }

  //to update a post  "/posts/:postId"
  @PATCH
  @Path("/:postId")
  public async updatePost(
    @PathParam("postId") postId: string,
    post: PostModel
  ):  Promise<PostModel> {
    return this.injectedService.updatePost(postId, post);
  }

  //to delete a post "/posts/:postId""
  @DELETE
  @Path("/:postId")
  public async deletePost(
    @PathParam("postId") postId: string
  ):  Promise<PostModel> {
    return this.injectedService.deletePost(postId);
  }

  //to get post by id "/posts/:id"
  @GET
  @Path(":id")
  public async getPostById(@PathParam("id") id: string): Promise<PostModel>{
    return this.injectedService.getPostById(id);
  }

  //to get all post "/posts"
  @GET
  public async getAllPost(): Promise<PostModel[]> {
    return this.injectedService.getAllPost();
  }

  //to like a post  "/posts/:postId/likes"
  @POST
  @Path(":postId/likes")
  public async likePost(
    @PathParam("postId") postId: string,
    post: PostModel
  ):  Promise<PostModel> {
    return this.injectedService.likePost(postId, post);
  }

  //to add a comment to a post "/posts/:postId/comments"
  @POST
  @Path("/:postId/comments")
  public async addNewComment(
    @PathParam("postId")
    postId: ObjectId,
    comment: CommentModel
  ): Promise<CommentModel>{
    return this.injectedService.addNewComment(postId, comment);
  }

  //to get all comments of particular post "/posts/:postId/comments"
  @GET
  @Path("/:postId/comments")
  public async getCommentByPostId(
    @PathParam("postId") postId: ObjectId
  ): Promise<CommentModel[]> {
    return this.injectedService.getCommentByPostId(postId);
  }
}
