const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const postSchema = new mongoose.Schema({
  id: String,
  text: String,
});

const Post = mongoose.model(`post`, postSchema);

module.exports = {
  Post,
};
