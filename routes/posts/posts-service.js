const { Post } = require("../../models/schemes");

async function createPost(post) {
  try {
    return await Post.create({
      text: post.text,
      timeStamp: new Date(),
      user: post.user,
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

async function getUserPosts(userId) {
  try {
    const userPosts = await Post.find({ "user.id": userId });
    return userPosts;
  } catch (error) {
    throw error;
  }
}

async function toggleLike(userId, postId) {
  try {
    // await Post.updateOne({like})
    const post = await getPost(postId);
    let likes = post.likes;
    const userLiked = post.likes.includes(userId);
    if (userLiked) {
      // If user has liked the post, remove the userId from likes array
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      console.log("User unliked the post.");
    } else {
      // If user hasn't liked the post, add the userId to likes array
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
      console.log("User liked the post.");
    }
  } catch (error) {
    throw error;
  }
}

async function addComment(comment){
  try {
    const post = await getPost(comment.postId);
    const newComment = {
      user: comment.user,
      text: comment.text,
    }
    post.comments.push(newComment);
    return await editPost(post);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createPost,
  getPosts,
  deletePost,
  getPost,
  editPost,
  getUserPosts,
  toggleLike,
  addComment,
};
