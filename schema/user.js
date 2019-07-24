const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    UserID: ObjectId,
    password: String,
    account: { unique: true, type: String },
    level: { type: Number, default: 1 },
    avatar: {
      type: String,
      default: "http://www.zhangnan35.net/protect/default-avatar.jpg"
    }
  },
  {
    versionKey: false,
    collection: "users"
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
