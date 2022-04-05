import mongoose from "mongoose";

const conmmentsModel = mongoose.Schema({
  post: String,
  text: String,
  timestamp: String,
  post_id: String,
});

export default mongoose.model("comments", conmmentsModel);
