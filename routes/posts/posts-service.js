const { Post } = require("../../models/schemes");
const userService = require("../users/users-service");
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

async function getPosts(userId) {
  try {
    const user = await userService.getUser(userId);
    const follows = [...user.follows, userId];
    const posts = await Post.find({ "user.id": { $in: follows } });
    return posts;
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
    console.log(postId);
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

async function addComment(comment) {
  try {
    const post = await getPost(comment.postId);
    const newComment = {
      user: comment.user,
      text: comment.text,
      timeStamp: new Date(),
    };
    post.comments.push(newComment);
    await editPost(post);
    const addedComment = post.comments[post.comments.length - 1];
    return addedComment;
  } catch (error) {
    throw error;
  }
}

async function deleteComment(comment) {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      comment.postId,
      { $pull: { comments: { _id: comment.commentId } } },
      { new: true }
    );
    if (!updatedPost) {
      throw new Error("Post not found");
    }

    return updatedPost;
  } catch (error) {
    throw error;
  }
}

async function toggleCommentLike(userId, postId, commentId) {
  try {
    // Get the post by postId
    const post = await Post.findById(postId);

    if (!post) {
      throw new Error("Post not found");
    }

    // Find the comment within the comments array
    const comment = post.comments.find((c) => c._id.toString() === commentId);

    if (!comment) {
      throw new Error("Comment not found");
    }

    // Check if the user's ID is in the comment's likes array
    const likedIndex = comment.likes.indexOf(userId);

    if (likedIndex === -1) {
      // User has not liked the comment, add the user's ID to the likes array
      comment.likes.push(userId);
    } else {
      // User has already liked the comment, remove the user's ID from the likes array
      comment.likes.splice(likedIndex, 1);
    }

    // Save the updated post with the modified comment
    const updatedPost = await post.save();

    return updatedPost;
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
  deleteComment,
  toggleCommentLike,
};
