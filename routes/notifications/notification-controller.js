const notificationService = require("./notification-service");
async function toggleNotification(req, res) {
  try {
    const notification = req.body;
    notificationService.toggleNotification(notification);
    res.send("Notification has been added.");
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = { toggleNotification };
