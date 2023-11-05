var gIo = null;

const postService = require("../routes/posts/posts-service");

async function setupSocketAPI(http) {
  gIo = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });

  gIo.on("connection", (socket) => {
    console.log("socket connected");
    socket.on("setup-socket", (userId) => {
      socket.userId = userId;
      console.log(socket.userId);
    });
    socket.on("notification", async (postId) => {
      const post = await postService.getPost(postId);
      const userId = post.user.id;
      const target = await getUserSocket(userId);
      console.log(target);
      if (target && target.userId !== userId) {
        target.emit("notification");
      }
    });
    socket.on("like-comment-notification", async ({ postId, commentId }) => {
      const comment = await postService.getComment(postId, commentId);
      const userId = comment.user.id;
      const target = await getUserSocket(userId);
      if (target && target.userId !== userId) {
        console.log("ike-comment-notification");
        target.emit("notification");
      }
    });
  });
  async function getUserSocket(userId) {
    const sockets = await _getAllSockets();
    const socket = sockets.find((s) => {
      return s.userId === userId;
    });

    return socket;
  }

  async function _getAllSockets() {
    const sockets = await gIo.fetchSockets();
    return sockets;
  }
}
module.exports = {
  setupSocketAPI,
};
