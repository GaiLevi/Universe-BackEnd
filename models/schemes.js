const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const postSchema = new mongoose.Schema({
  id: String,
  text: String,
  timeStamp: Date,
  likes: [String],
  comments: [
    {
      user: {
        id: String,
        userName: String,
        profileImage: String,
      },
      timeStamp: Date,
      text: String,
      likes: [String],
    },
  ],
  user: {
    id: String,
    userName: String,
    profileImage: String,
  },
});

const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  profileImage: String,
});

const Post = mongoose.model(`post`, postSchema);
const User = mongoose.model(`user`, userSchema);

module.exports = {
  Post,
  User,
};
