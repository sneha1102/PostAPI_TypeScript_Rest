import { Container } from 'typescript-ioc';
import mongoose from 'mongoose';
import {Errors} from 'typescript-rest';

import {User, UserModel, Message, MessageModel} from '../../model';
import {UserService} from '../UserService';

/**
 * Implementation of User Service
`*/
export class UserServiceImpl implements UserService {
  
 /**
   * Create new user
   * @param user UserModel data
   * @return user UserModel
   */
  public async addNewUser(user: UserModel): Promise<UserModel> {
    try {
        return await User.create(user);
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }

   /**
     * Returns a user info
     * @param id user identity
     * @return user UserModel
     */
  public async getUserById(id: string): Promise<UserModel> {
    try {
      let result: UserModel = await User.findById(id);
      if (!result)
      {
        throw new Errors.NotFoundError(`User with id:${id} not found`)
      }
        return result;
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }

   /**
     * Returns array of user
     * @return user UserModel[]
     */
  public async getAllUser(): Promise<UserModel[]> {
    try {
      let result: UserModel[] = await User.find({});
      if (result.length <= 0)
      {
        throw new Errors.NotFoundError('Users not found');
      }
        return result ;
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }

  /**
   * Create new message
   * @param senderId User identity
   * @param message MessageModel
   * @return message MessageModel
   */
  public async sendMessage(senderId: string, message: MessageModel): Promise<MessageModel> {
    try {
      message.roomId = [senderId, message.receiverId].sort().join("");
      message.senderId = senderId;
      return await Message.create(message);
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }

  /**
     * Returns array of message
     * @param userId user identity
     * @return array of message MessageModel[]
     */
  public async getAllMessageByTime(userId: string): Promise<MessageModel[]> {
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
      if (result.length <= 0)
      {
        throw new Errors.NotFoundError(`Messages not found with id:${userId}`);
      }
        return result;
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }
}
Container.bind(UserService).to(UserServiceImpl);
