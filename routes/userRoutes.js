
import express from "express";
import { getUserProfile, login, signup } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/signup", signup);
userRoutes.post("/login", login);
userRoutes.get("/:userId", getUserProfile);

export default userRoutes;
