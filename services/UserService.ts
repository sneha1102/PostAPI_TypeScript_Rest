import { Container } from "typescript-ioc";
import mongoose from "mongoose";

import { User, UserModel, Message, MessageModel } from "../model/index";

export abstract class UserService {
  public abstract addNewUser(user: UserModel): Promise<UserModel>;
  public abstract getUserById(id: string): Promise<UserModel>;
  public abstract getAllUser(): Promise<Array<UserModel>>;
  public abstract sendMessage(
    senderId: string,
    message: MessageModel
  ): Promise<MessageModel>;
  public abstract getAllMessageByTime(
    userId: string
  ): Promise<Array<MessageModel>>;
}

//implementation of interface

export class UserServiceImpl implements UserService {
  //to add a new user
  public addNewUser(user: UserModel): Promise<UserModel> {
    try {
      return User.create(user);
    } catch (err) {
      return err;
    }
  }

  //to get user by id
  public async getUserById(id: string): Promise<UserModel> {
    try {
      return await User.findById(id).exec();
    } catch (err) {
      return err;
    }
  }

  //to get all users

  public async getAllUser(): Promise<Array<UserModel>> {
    try {
      return await User.find({}).exec();
    } catch (err) {
      return err;
    }
  }

  //to send message

  public async sendMessage(
    senderId: string,
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

  //to get all message by time

  public async getAllMessageByTime(
    userId: string
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
Container.bind(UserService).to(UserServiceImpl);
