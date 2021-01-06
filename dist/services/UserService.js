"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../model/user"));
const message_1 = __importDefault(require("../model/message"));
class UserService {
    //to add a new user
    addNewUser(user) {
        try {
            return user_1.default.create(user);
        }
        catch (err) {
            return err;
        }
    }
    //to get user by id
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.findById(id).exec();
            }
            catch (err) {
                return err;
            }
        });
    }
    //to get all users
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_1.default.find({}).exec();
            }
            catch (err) {
                return err;
            }
        });
    }
    //to send message
    sendMessage(senderId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                message.roomId = [senderId, message.receiverId].sort().join("");
                message.senderId = senderId;
                return message_1.default.create(message);
            }
            catch (err) {
                return err;
            }
        });
    }
    //to get all message by time
    getAllMessageByTime(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield message_1.default.aggregate([
                    {
                        $match: {
                            $or: [
                                { senderId: mongoose_1.default.Types.ObjectId(userId) },
                                { receiverId: mongoose_1.default.Types.ObjectId(userId) },
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
            }
            catch (err) {
                return err;
            }
        });
    }
}
exports.UserService = UserService;
