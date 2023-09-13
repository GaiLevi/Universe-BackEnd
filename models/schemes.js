const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const postSchema = new mongoose.Schema({
  id: String,
  text: String,
  timeStamp: Date,
  user: {
    id: String,
    userName: String,
  },
});

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

const Post = mongoose.model(`post`, postSchema);
const User = mongoose.model(`user`, userSchema);

module.exports = {
  Post,
  User,
};
