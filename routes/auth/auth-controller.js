const authService = require("./auth-service");
const userService = require("../users/users-service");
async function login(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const user = await authService.login(req.body);
    const loginToken = authService.getLoginToken(user._id);
    console.log(loginToken);
    res.cookie("loginToken", loginToken, {
      httpOnly: true,
      secure: true,
      domain: "https://universe-frontend.onrender.com",
      path: "/",
    });
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
    }
  } catch (error) {
    res.status(error.status).send(error);
  }
}
async function logout(req, res) {
  try {
    res.clearCookie("loginToken");
    res.send("Cookie deleted");
  } catch (error) {
    res.status(error.status).send(error);
  }
}
module.exports = { login, getLoggedUser, logout };
