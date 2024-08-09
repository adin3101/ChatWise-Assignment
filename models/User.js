import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  bio: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model("User", userSchema);