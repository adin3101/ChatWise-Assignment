import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user_Id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  });

const postSchema = new Schema({
    user_Id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    comments: [commentSchema]
  });

  export default mongoose.model("Posts", postSchema);