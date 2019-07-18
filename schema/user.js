const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    UserId: objectId,
    account: { unique: true, type: String },
    password: String
  },
  {
    versionKey: false,
    collection: "users"
  }
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
