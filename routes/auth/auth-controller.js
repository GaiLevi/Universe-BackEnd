const authService = require("./auth-service");
async function login(req, res) {
  try {
    const user = await authService.login(req.body);
    const loginToken = authService.getLoginToken(user);
    res.cookie("loginToken", loginToken);
    res.send(user);
  } catch (error) {
    res.status(error.status).send(error);
  }
}
async function getLoggedUser(req, res) {
  try {
    const user = authService.validateToken(req.cookies.loginToken);
    res.send(user);
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
