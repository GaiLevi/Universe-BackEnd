var express = require("express");
var router = express.Router();
const { Post } = require("../../models/database.js");
const {
  createPost,
  getPosts,
  deletePost,
  enterPost,
  editPost,
} = require("./posts-controller.js");

router.post("/", createPost);
router.get("/", getPosts);
router.delete("/:id", deletePost);
router.get("/:id", enterPost);
router.put("/", editPost);

module.exports = router;
