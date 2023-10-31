const createHttpError = require("http-errors");
const userService = require("./users-service");

async function signUpUser(req, res) {
  try {
    const user = await userService.signUpUser(req.body);
    res.send(user);
  } catch (error) {
    res.status(error.status).send(error);
  }
}
async function deleteUser(req, res) {
  try {
    await userService.deleteUser(req.params.id);
    res.send("User deleted.");
  } catch (error) {
    res.status(error.status).send(error);
  }
}
async function updateUser(req, res) {
  try {
    await userService.updateUser(req.body);
    res.send("User updated");
  } catch (error) {
    res.status(error.status).send(error);
  }
}
async function getUser(req, res) {
  try {
    const user = await userService.getUser(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(error.status).send(error);
  }
}
async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function toggleFollow(req, res) {
  try {
    const { userId, followId } = req.params;
    if (userId === followId) {
      throw createHttpError.Unauthorized("Cannot follow yourself.");
    }
    await userService.toggleFollow(userId, followId);
    res.send(`follow added to ${followId}`);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function getUsersByName(req, res) {
  try {
    const { userName } = req.params;

    const users = await userService.getUsersByName(userName);
    res.send(users);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

async function resetUnseenNot(req, res) {
  try {
    const { userId } = req.params;
    await userService.resetUnseenNot(userId);
    res.send("Unseen Notifications number have been reset.");
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = {
  signUpUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  toggleFollow,
  getUsersByName,
  resetUnseenNot,
};
