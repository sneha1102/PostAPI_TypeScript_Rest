import { GET, POST, DELETE, PATCH, PathParam, Path } from "typescript-rest";
import { ObjectId } from "mongoose";
import { Inject } from "typescript-ioc";

import { PostModel } from "../model/post";
import { CommentModel } from "../model/comment";
import { PostService } from "../services/PostService";

@Path("/posts")
export class PostClassController {
  @Inject
  private injectedService: PostService;

  //to add new post   "/posts"
  @POST
  public addNewPost(post: PostModel): Promise<PostModel> {
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

// @Path("/posts")
// export class PostClassController {
//   //to add new post   "/posts"
//   @POST
//   public addNewPost(post: PostModel): Promise<PostModel> {
//     try {
//       return Post.create(post);
//     } catch (err) {
//       return err;
//     }
//   }

//   //to update a post

//   @PATCH
//   @Path("/:postId")
//   public async updatePost(
//     @PathParam("postId") postId: ObjectId,
//     post: PostModel
//   ): Promise<PostModel> {
//     try {
//       const result = await Post.findByIdAndUpdate(postId, post, { new: true });
//       return result;
//     } catch (err) {
//       return err;
//     }
//   }

//   //to delete a post

//   @DELETE
//   @Path("/:postId")
//   public async deletePost(
//     @PathParam("postId") postId: string
//   ): Promise<PostModel> {
//     try {
//       const result = await Post.findByIdAndDelete(postId);
//       return result;
//     } catch (err) {
//       return err;
//     }
//   }

//   //to get post by id "/posts/:id"

//   @GET
//   @Path(":id")
//   public async getPostById(@PathParam("id") id: string): Promise<PostModel> {
//     try {
//       return await Post.findById(id);
//     } catch (err) {
//       return err;
//     }
//   }

//   //to get all post "/posts"

//   @GET
//   public async getAllPost(): Promise<Array<PostModel>> {
//     try {
//       return await Post.find({});
//     } catch (err) {
//       return err;
//     }
//   }

//   //to like a post  "/posts/:postId/likes"

//   @POST
//   @Path(":postId/likes")
//   public async likePost(
//     @PathParam("postId") postId: ObjectId,
//     post: PostModel
//   ): Promise<PostModel> {
//     try {
//       let result: PostModel;
//       let userId: ObjectId = post.postedBy;
//       result = await Post.findByIdAndUpdate(
//         postId,
//         {
//           $inc: { likes: 1 },
//           $push: {
//             likeDetails: {
//               $each: [
//                 {
//                   likedBy: userId,
//                 },
//               ],
//               $position: 0,
//             },
//           },
//         },
//         { new: true }
//       );

//       return result;
//     } catch (err) {
//       return err;
//     }
//   }

//   //to add a comment to a post

//   @POST
//   @Path("/:postId/comments")
//   public async addNewComment(
//     @PathParam("postId") postId: ObjectId,
//     comment: CommentModel
//   ): Promise<CommentModel> {
//     try {
//       comment.postId = postId;
//       return Comment.create(comment);
//     } catch (err) {
//       return err;
//     }
//   }

//   //to get all comments of particular post

//   @GET
//   @Path("/:postId/comments")
//   public async getCommentByPostId(
//     @PathParam("postId") postId: ObjectId
//   ): Promise<Array<CommentModel>> {
//     try {
//       let res = await Comment.find({ postId: postId })
//         .populate("commentedBy")
//         .populate("postId");
//       return res;
//     } catch (err) {
//       return err;
//     }
//   }
// }
