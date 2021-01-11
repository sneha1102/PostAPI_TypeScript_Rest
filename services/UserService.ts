import { Container } from "typescript-ioc";
import mongoose from "mongoose";

import { User, UserModel, Message, MessageModel } from "../model/index";

export abstract class UserService {
  public abstract addNewUser(user: UserModel): Object;
  public abstract getUserById(id: string): Promise<Object>;
  public abstract getAllUser(): Promise<Object>;
  public abstract sendMessage(senderId: string, message: MessageModel): Object;
  public abstract getAllMessageByTime(userId: string): Promise<Object>;
}

//implementation of interface
export class UserServiceImpl implements UserService {
  //to add a new user
  public addNewUser(user: UserModel): Object {
    try {
      User.create(user);
      return { message: "User created successfully" };
    } catch (err) {
      return { Error: err };
    }
  }

  //to get user by id
  public async getUserById(id: string): Promise<Object> {
    try {
      let result: UserModel = await User.findById(id);
      if (!result) {
        return { message: `User with id:${id} not found` };
      } else {
        return { message: "User found", User: result };
      }
    } catch (err) {
      return { Error: err };
    }
  }

  //to get all users
  public async getAllUser(): Promise<Object> {
    try {
      let result: UserModel[] = await User.find({});
      if (result.length <= 0) {
        return { message: `Users not found` };
      } else {
        return { message: "Users found", User: result };
      }
    } catch (err) {
      return { Error: err };
    }
  }

  //to send message
  public sendMessage(senderId: string, message: MessageModel): Object {
    try {
      message.roomId = [senderId, message.receiverId].sort().join("");
      message.senderId = senderId;
      Message.create(message);
      return { message: "Message sent" };
    } catch (err) {
      return { Error: err };
    }
  }

  //to get all message by time
  public async getAllMessageByTime(userId: string): Promise<Object> {
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

      //if resultant message array is empty
      if (result.length <= 0) {
        return { message: `Messages not found with id:${userId}` };
      } else {
        return { message: "Messages found", Messages: result };
      }
    } catch (err) {
      return { Error: err };
    }
  }
}
Container.bind(UserService).to(UserServiceImpl);
