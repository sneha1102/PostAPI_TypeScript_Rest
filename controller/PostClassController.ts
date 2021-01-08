import { GET, POST, DELETE, PATCH, PathParam, Path } from "typescript-rest";
import { ObjectId } from "mongoose";
import { Inject } from "typescript-ioc";

import { PostModel, CommentModel } from "../model/index";
import { PostService } from "../services/index";

@Path("/posts")
export class PostClassController {
  @Inject
  private injectedService: PostService;

  //to add new post   "/posts"
  @POST
  public addNewPost(
    post: PostModel
    //@FileParam("file") file: Express.Multer.File
  ): Promise<PostModel> {
    return this.injectedService.addNewPost(post);
  }

  //to update a post

  @PATCH
  @Path("/:postId")
  public async updatePost(
    @PathParam("postId") postId: string,
    post: PostModel
  ): Promise<PostModel> {
    return this.injectedService.updatePost(postId, post);
  }

  //to delete a post

  @DELETE
  @Path("/:postId")
  public async deletePost(
    @PathParam("postId") postId: string
  ): Promise<PostModel> {
    return this.injectedService.deletePost(postId);
  }

  //to get post by id "/posts/:id"

  @GET
  @Path(":id")
  public async getPostById(@PathParam("id") id: string): Promise<PostModel> {
    return this.injectedService.getPostById(id);
  }

  //to get all post "/posts"

  @GET
  public async getAllPost(): Promise<Array<PostModel>> {
    return this.injectedService.getAllPost();
  }

  //to like a post  "/posts/:postId/likes"

  @POST
  @Path(":postId/likes")
  public async likePost(
    @PathParam("postId") postId: string,
    post: PostModel
  ): Promise<PostModel> {
    return this.injectedService.likePost(postId, post);
  }

  //to add a comment to a post

  @POST
  @Path("/:postId/comments")
  public async addNewComment(
    @PathParam("postId") postId: ObjectId,
    comment: CommentModel
  ): Promise<CommentModel> {
    return this.injectedService.addNewComment(postId, comment);
  }

  //to get all comments of particular post

  @GET
  @Path("/:postId/comments")
  public async getCommentByPostId(
    @PathParam("postId") postId: ObjectId
  ): Promise<Array<CommentModel>> {
    return this.injectedService.getCommentByPostId(postId);
  }
}
