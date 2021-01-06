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
exports.PostService = void 0;
const post_1 = __importDefault(require("../model/post"));
const comment_1 = __importDefault(require("../model/comment"));
class PostService {
    //to add new post
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
    //to get post by id
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield post_1.default.findById(id);
            }
            catch (err) {
                return err;
            }
        });
    }
    //to get all post
    getAllPost() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield post_1.default.find({});
            }
            catch (err) {
                return err;
            }
        });
    }
    //to like a post
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
    //to get all comment of particular post
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
}
exports.PostService = PostService;
