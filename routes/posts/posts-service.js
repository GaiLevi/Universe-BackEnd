const { Post } = require("../../models/schemes");

async function createPost(post) {
  try {
    return await Post.create({
      text: post.text,
    });
  } catch (error) {
    throw error;
  }
}

async function getPosts() {
  try {
    return await Post.find({});
  } catch (error) {
    throw error;
  }
}

async function deletePost(postId) {
  try {
    await Post.deleteOne({ _id: postId });
  } catch (error) {
    throw error;
  }
}

async function getPost(postId) {
  try {
    const post = await Post.findById(postId);
    return post;
  } catch (error) {
    throw error;
  }
}
async function editPost(post) {
  try {
    return await Post.updateOne({ _id: post._id }, post);
  } catch (error) {
    throw error;
  }
}

module.exports = { createPost, getPosts, deletePost, getPost, editPost };
