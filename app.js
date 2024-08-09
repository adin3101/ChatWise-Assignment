
import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import friendRequestRoutes from "./routes/friendRequestsRoutes.js";

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://adinansari31:gYWn3ZFJ5mZBxLkX@cluster0.ar92iug.mongodb.net/Assessment"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("Connected to the database "))
  .catch((err) => console.log(err));

app.use("/posts", postRoutes);
app.use("/users", userRoutes);
app.use("/friendRequests", friendRequestRoutes);

