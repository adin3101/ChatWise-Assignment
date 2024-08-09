import express from "express";
import {
    addComment,
  createPost,
  getfriendPosts,
  getPostWFriendsComments,
} from "../controllers/postController.js";

const postRoutes = express.Router();

postRoutes.get("/friends/:userId", getfriendPosts);
postRoutes.get("/PostWFriendsComments/:userId", getPostWFriendsComments);
postRoutes.post("/create", createPost);
postRoutes.post("/comment/:postId",addComment);
export default postRoutes;
