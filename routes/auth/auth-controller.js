const authService = require("./auth-service");
const userService = require("../users/users-service");
async function login(req, res) {
  try {
    const user = await authService.login(req.body);
    const loginToken = authService.getLoginToken(user._id);
    console.log(loginToken);
    const cookie = `loginToken=${loginToken}; samesite=none; secure`;
    res.setHeader("set-cookie", [cookie]);
    res.cookie("loginToken", loginToken);
    res.send(user);
  } catch (error) {
    res.status(error.status).send(error);
  }
}
async function getLoggedUser(req, res) {
  try {
    if (req.cookies.loginToken) {
      const userId = authService.validateToken(req.cookies.loginToken);
      const user = await userService.getUser(userId);
      res.send(user);
    } else {
      res.send(null);
    }
  } catch (error) {
    res.status(error.status).send(error);
  }
}
async function logout(req, res) {
  try {
    const expiredCookie = `loginToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=none; secure; path=/`;
    res.setHeader("set-cookie", [expiredCookie]);
    res.clearCookie("loginToken");
    res.send("Cookie deleted");
  } catch (error) {
    res.status(error.status).send(error);
  }
}
module.exports = { login, getLoggedUser, logout };
