const createHttpError = require("http-errors");
const { User } = require("../../models/schemes");

async function getUserByEmail(email) {
  try {
    return await User.findOne({ email: email });
  } catch (error) {
    throw error;
  }
}

async function signUpUser(newUser) {
  try {
    const isUserExist = await getUserByEmail(newUser.email);
    if (isUserExist) {
      throw createHttpError.Unauthorized("Email already exist.");
    }
    const user = await User.create(newUser);
    return user;
  } catch (error) {
    throw error;
  }
}
async function deleteUser(userId) {
  try {
    await User.deleteOne({ _id: userId });
  } catch (error) {
    throw error;
  }
}
async function updateUser(updatedUser) {
  try {
    const user = await User.updateOne({ _id: updatedUser._id }, updatedUser);
  } catch (error) {
    throw error;
  }
}
async function getUser(userId) {
  try {
    return await User.findById(userId);
  } catch (error) {
    throw error;
  }
}
async function getUsers() {
  try {
    return await User.find({});
  } catch (error) {
    throw error;
  }
}
module.exports = { signUpUser, deleteUser, getUsers, updateUser, getUser };
