const userService = require("../users/users-service");

async function toggleNotification(notification) {
  try {
    const { recieverId, action, postId, commentId, provokerId } = notification;
    const reciever = await userService.getUser(recieverId);
    const notIndex = reciever.notifications.findIndex((notification) => {
      return (
        action === notification.action &&
        postId === notification.postId &&
        commentId === notification.commentId &&
        provokerId === notification.provokerId
      );
    });
    if (notIndex === -1) {
      reciever.notifications.push(notification);
      reciever.unseenNotifications++;
      await userService.updateUser(reciever);
    } else {
      reciever.notifications.splice(notIndex, 1);
      if (reciever.unseenNotifications > 0) {
        reciever.unseenNotifications--;
      }
      await userService.updateUser(reciever);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { toggleNotification };
