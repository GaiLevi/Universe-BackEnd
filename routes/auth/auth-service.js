const createError = require("http-errors");
const { User } = require("../../models/schemes");

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
  } catch (error) {
    throw error;
  }
}
module.exports = { login };
