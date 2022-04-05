import mongoose from "mongoose";

const postsModel = mongoose.Schema({
  user: String,
  imgeName: String,
  text: String,
  avatar: String,
  timestamp: String,
});

export default mongoose.model("posts", postsModel);
