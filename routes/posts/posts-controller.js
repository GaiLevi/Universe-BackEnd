const postService = require("./posts-service");

async function createPost(req, res) {
  try {
    const { text, user } = req.body;
    const post = { text, user };
    const newPost = await postService.createPost(post);
    res.send(newPost);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function getPosts(req, res) {
  try {
    const posts = await postService.getPosts();
    res.send(posts);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    await postService.deletePost(postId);
    res.send(`Post with id of: ${postId} deleted!`);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function enterPost(req, res) {
  try {
    const postId = req.params.id;
    const post = await postService.getPost(postId);
    res.send(post);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function editPost(req, res) {
  try {
    const post = req.body;
    const updatedPost = await postService.editPost(post);
    res.send("post updated");
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function getUserPosts(req, res) {
  try {
    const userId = req.params.id;
    const userPosts = await postService.getUserPosts(userId);
    res.send(userPosts);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function toggleLike(req, res) {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;
    await postService.toggleLike(userId, postId);
    res.send("likeToggle");
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function addComment(req,res){
  try {
    const { text, user } = req.body;
    const postId = req.params.postId;
    const comment = {postId,text,user};
    const newComment = await postService.addComment(comment);
    res.send(newComment);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = {
  createPost,
  getPosts,
  deletePost,
  enterPost,
  editPost,
  getUserPosts,
  toggleLike,
  addComment,
};
