"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const post_1 = __importDefault(require("../model/post"));
class PostService {
    addNewPost(post) {
        try {
            return post_1.default.create(post);
        }
        catch (err) {
            return err;
        }
    }
}
exports.PostService = PostService;
