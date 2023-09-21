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

module.exports = { signUpUser, getUser, getUsers, deleteUser, updateUser };
