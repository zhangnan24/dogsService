const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema(
  {
    PostID: ObjectId,
    msg: String,
    imgs: Array,
    like: { type: Number, default: 0 },
    create_time: String,
    author: {
      type: ObjectId,
      ref: "user"
    }
  },
  {
    versionKey: false,
    collection: "posts"
  }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = PostModel;
