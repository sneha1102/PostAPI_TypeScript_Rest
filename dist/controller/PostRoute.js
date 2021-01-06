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
exports.PostClassController = void 0;
const typescript_rest_1 = require("typescript-rest");
const post_1 = __importDefault(require("../model/post"));
const comment_1 = __importDefault(require("../model/comment"));
let PostClassController = class PostClassController {
    //to add new post  "/posts"
    addNewPost(post) {
        try {
            return post_1.default.create(post);
        }
        catch (err) {
            return err;
        }
    }
    //to update a post
    updatePost(postId, post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield post_1.default.findByIdAndUpdate(postId, post, { new: true });
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    //to delete a post
    deletePost(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield post_1.default.findByIdAndDelete(postId);
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    //to get post by id "/posts/:id"
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield post_1.default.findById(id).exec();
            }
            catch (err) {
                return err;
            }
        });
    }
    //to get all post "/posts"
    getAllPost() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield post_1.default.find({}).exec();
            }
            catch (err) {
                return err;
            }
        });
    }
    //to like a post  "/posts/:postId/likes"
    likePost(postId, post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                let userId = post.postedBy;
                result = yield post_1.default.findByIdAndUpdate(postId, {
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
                }, { new: true });
                return result;
            }
            catch (err) {
                return err;
            }
        });
    }
    //to add a comment to a post
    addNewComment(postId, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                comment.postId = postId;
                return comment_1.default.create(comment);
            }
            catch (err) {
                return err;
            }
        });
    }
    //to get all comments of particular post
    getCommentByPostId(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield comment_1.default.find({ postId: postId })
                    .populate("commentedBy")
                    .populate("postId");
                return res;
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
], PostClassController.prototype, "addNewPost", null);
__decorate([
    typescript_rest_1.PATCH,
    typescript_rest_1.Path("/:postId"),
    __param(0, typescript_rest_1.PathParam("postId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostClassController.prototype, "updatePost", null);
__decorate([
    typescript_rest_1.DELETE,
    typescript_rest_1.Path("/:postId"),
    __param(0, typescript_rest_1.PathParam("postId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostClassController.prototype, "deletePost", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path(":id"),
    __param(0, typescript_rest_1.PathParam("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostClassController.prototype, "getPostById", null);
__decorate([
    typescript_rest_1.GET,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostClassController.prototype, "getAllPost", null);
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path(":postId/likes"),
    __param(0, typescript_rest_1.PathParam("postId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostClassController.prototype, "likePost", null);
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path("/:postId/comments"),
    __param(0, typescript_rest_1.PathParam("postId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostClassController.prototype, "addNewComment", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path("/:postId/comments"),
    __param(0, typescript_rest_1.PathParam("postId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostClassController.prototype, "getCommentByPostId", null);
PostClassController = __decorate([
    typescript_rest_1.Path("/posts")
], PostClassController);
exports.PostClassController = PostClassController;
