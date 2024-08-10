import express from "express";
import {
    acceptFriendRequest,
  getFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "../controllers/friendRequestsController.js";

const friendRequestRoutes = express.Router();

friendRequestRoutes.post("/send", sendFriendRequest);
friendRequestRoutes.get("/:userId", getFriendRequest);
friendRequestRoutes.post("/accept",acceptFriendRequest);
friendRequestRoutes.post("/reject",rejectFriendRequest);

export default friendRequestRoutes;
