const postService = require("./posts-service");

async function createPost(req, res) {
  try {
    const { text, user } = req.body;
    const post = { text, user };
    const newPost = await postService.createPost(post);
    res.send(newPost);
  } catch (error) {
    res.send(error);
  }
}

async function getPosts(req, res) {
  try {
    const posts = await postService.getPosts();
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    await postService.deletePost(postId);
    res.send(`Post with id of: ${postId} deleted!`);
  } catch (error) {
    res.send(error);
  }
}

async function enterPost(req, res) {
  try {
    const postId = req.params.id;
    const post = await postService.getPost(postId);
    res.send(post);
  } catch (error) {
    res.send(error);
  }
}

async function editPost(req, res) {
  try {
    const post = req.body;
    const updatedPost = await postService.editPost(post);
    res.send("post updated");
  } catch (error) {
    res.send(error);
  }
}

module.exports = { createPost, getPosts, deletePost, enterPost, editPost };
