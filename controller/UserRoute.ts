import mongoose from "mongoose";
import { DELETE, GET, Path, PathParam, POST } from "typescript-rest";
import User, { UserModel } from "../model/user";
import Message, { MessageModel } from "../model/message";
import { ObjectId } from "mongoose";
@Path("/users")
export class UserClassController {
  //to add new user "/users"
  @POST
  public addNewUser(user: UserModel): Promise<UserModel> {
    try {
      return User.create(user);
    } catch (err) {
      return err;
    }
  }

  //to get user by id "/users/:id"
  @GET
  @Path(":id")
  public async getUserById(@PathParam("id") id: string): Promise<UserModel> {
    try {
      return await User.findById(id).exec();
    } catch (err) {
      return err;
    }
  }

  //to get all users "/users"
  @GET
  public async getAllUser(): Promise<Array<UserModel>> {
    try {
      return await User.find({}).exec();
    } catch (err) {
      return err;
    }
  }

  //to send message "/users/:senderId/messages"
  @POST
  @Path(":senderId")
  public async sendMessage(
    @PathParam("senderId") senderId: ObjectId,
    message: MessageModel
  ): Promise<MessageModel> {
    try {
      message.roomId = [senderId, message.receiverId].sort().join("");
      message.senderId = senderId;
      return Message.create(message);
    } catch (err) {
      return err;
    }
  }

  //to get all messages by time "/users/:userId/messages"
  @GET
  @Path(":userId/messages")
  public async getAllMessageByTime(
    @PathParam("userId") userId: string
  ): Promise<Array<MessageModel>> {
    try {
      const result = await Message.aggregate([
        {
          $match: {
            $or: [
              { senderId: mongoose.Types.ObjectId(userId) },
              { receiverId: mongoose.Types.ObjectId(userId) },
            ],
          },
        },
        {
          $project: {
            message: 1,
            senderId: 1,
            receiverId: 1,
            createdAt: 1,
            roomId: 1,
            _id: 0,
          },
        },
        { $sort: { createdAt: -1 } },

        {
          $lookup: {
            from: "users",
            localField: "senderId",
            foreignField: "_id",
            as: "resultingSenderUser",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "receiverId",
            foreignField: "_id",
            as: "resultingReceiverUser",
          },
        },
        { $unwind: { path: "$resultingSenderUser" } },
        { $unwind: { path: "$resultingReceiverUser" } },

        {
          $group: {
            _id: "$roomId",
            message: { $first: "$message" },
            senderId: { $first: "$resultingSenderUser" },
            receiverId: { $first: "$resultingReceiverUser" },
            createdAt: { $first: "$createdAt" },
          },
        },

        { $sort: { createdAt: -1 } },
      ]);
      return result;
    } catch (err) {
      return err;
    }
  }
}
