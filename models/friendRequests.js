import mongoose from "mongoose";

const Schema = mongoose.Schema;

const friendRequestSchema = new Schema({
  fromUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  toUser: { type: Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

export default mongoose.model("friendRequest", friendRequestSchema);
