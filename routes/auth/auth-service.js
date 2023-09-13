const createError = require("http-errors");
const { User } = require("../../models/schemes");
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET1 || "Secret-Puk-1234");

async function login(user) {
  try {
    const loggedInUser = await User.findOne({
      userName: user.userName,
      password: user.password,
    });
    if (!loggedInUser) {
      console.log("not found");
      throw createError.NotFound("User not found");
    }
    return loggedInUser;
  } catch (error) {
    throw error;
  }
}
function getLoginToken(user) {
  return cryptr.encrypt(JSON.stringify(user));
}

function validateToken(loginToken) {
  try {
    const json = cryptr.decrypt(loginToken);
    const loggedinUser = JSON.parse(json);
    return loggedinUser;
  } catch (err) {
    console.log("Invalid login token");
  }
  return null;
}
module.exports = { login, getLoginToken, validateToken };
