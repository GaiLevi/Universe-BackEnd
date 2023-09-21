var express = require("express");
var router = express.Router();
const { Post } = require("../../models/database.js");
const {
  createPost,
  getPosts,
  deletePost,
  enterPost,
  editPost,
  getUserPosts,
  toggleLike,
} = require("./posts-controller.js");

router.post("/", createPost);
router.get("/", getPosts);
router.delete("/:id", deletePost);
router.get("/:id", enterPost);
router.get("/posts/:id", getUserPosts);
router.put("/", editPost);
router.post("/like/:userId/:postId", toggleLike);

module.exports = router;
