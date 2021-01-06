"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.UserClassController = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const typescript_rest_1 = require("typescript-rest");
const user_1 = __importDefault(require("../model/user"));
const message_1 = __importDefault(require("../model/message"));
let UserClassController = class UserClassController {
    //to add new user "/users"
    addNewUser(user) {
        try {
            return user_1.default.create(user);
        }
        catch (err) {
            return err;
        }
    }
    //to get user by id "/users/:id"
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
    //to get all users "/users"
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
    //to send message "/users/:senderId/messages"
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
    //to get all messages by time "/users/:userId/messages"
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
};
__decorate([
    typescript_rest_1.POST,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserClassController.prototype, "addNewUser", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path(":id"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserClassController.prototype, "getUserById", null);
__decorate([
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserClassController.prototype, "getAllUser", null);
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path(":senderId"),
    __param(0, typescript_rest_1.PathParam("senderId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserClassController.prototype, "sendMessage", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path(":userId/messages"),
    __param(0, typescript_rest_1.PathParam("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserClassController.prototype, "getAllMessageByTime", null);
UserClassController = __decorate([
    typescript_rest_1.Path("/users")
], UserClassController);
exports.UserClassController = UserClassController;
