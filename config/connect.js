const mongoose = require("mongoose");
const db = "mongodb://148.70.189.178:27017/doghouse";

module.exports = () => {
  mongoose.connect(db);
  mongoose.connection.once("open", () => console.log("***数据库连接成功***"));
};
