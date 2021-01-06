import { GET, POST, DELETE, PATCH, Path, PathParam } from "typescript-rest";
import Post, { PostModel } from "../model/post";
import { ObjectId } from "mongoose";
import Comment, { CommentModel } from "../model/comment";
@Path("/posts")
export class PostClassController {
  //to add new post   "/posts"
  @POST
  public addNewPost(post: PostModel): Promise<PostModel> {
    try {
      return Post.create(post);
    } catch (err) {
      return err;
    }
  }

  //to update a post
  @PATCH
  @Path("/:postId")
  public async updatePost(
    @PathParam("postId") postId: ObjectId,
    post: PostModel
  ): Promise<PostModel> {
    try {
      const result = await Post.findByIdAndUpdate(postId, post, { new: true });
      return result;
    } catch (err) {
      return err;
    }
  }

  //to delete a post
  @DELETE
  @Path("/:postId")
  public async deletePost(
    @PathParam("postId") postId: string
  ): Promise<PostModel> {
    try {
      const result = await Post.findByIdAndDelete(postId);
      return result;
    } catch (err) {
      return err;
    }
  }

  //to get post by id "/posts/:id"
  @GET
  @Path(":id")
  public async getPostById(@PathParam("id") id: string): Promise<PostModel> {
    try {
      return await Post.findById(id).exec();
    } catch (err) {
      return err;
    }
  }

  //to get all post "/posts"
  @GET
  public async getAllPost(): Promise<Array<PostModel>> {
    try {
      return await Post.find({}).exec();
    } catch (err) {
      return err;
    }
  }

  //to like a post  "/posts/:postId/likes"
  @POST
  @Path(":postId/likes")
  public async likePost(
    @PathParam("postId") postId: ObjectId,
    post: PostModel
  ): Promise<PostModel> {
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

      return result;
    } catch (err) {
      return err;
    }
  }

  //to add a comment to a post
  @POST
  @Path("/:postId/comments")
  public async addNewComment(
    @PathParam("postId") postId: ObjectId,
    comment: CommentModel
  ): Promise<CommentModel> {
    try {
      comment.postId = postId;
      return Comment.create(comment);
    } catch (err) {
      return err;
    }
  }

  //to get all comments of particular post
  @GET
  @Path("/:postId/comments")
  public async getCommentByPostId(
    @PathParam("postId") postId: ObjectId
  ): Promise<Array<CommentModel>> {
    try {
      let res = await Comment.find({ postId: postId })
        .populate("commentedBy")
        .populate("postId");
      return res;
    } catch (err) {
      return err;
    }
  }
}
