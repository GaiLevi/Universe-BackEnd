const authService = require("./auth-service");
async function login(req, res) {
  try {
    await authService.login(req.body);
  } catch (error) {
    res.status(error.status).send(error);
  }
}
module.exports = { login };
