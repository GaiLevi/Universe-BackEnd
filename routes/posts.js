var express = require("express");
var router = express.Router();
const { Post } = require("../models/database.js");

router.post("/", async (req, res, next) => {
  console.log(req.body.text);
  const text = req.query.text;
  const post = await Post.create({
    id: "1020",
    text,
  });
  res.send(post);
});

module.exports = router;
