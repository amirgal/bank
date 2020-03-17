const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: String,
  username: String,
  password: String,
  transactions: [{type:Schema.Types.ObjectId, ref:'Transaction'}]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
