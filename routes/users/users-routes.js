var express = require("express");
var router = express.Router();
const {
  deleteUser,
  updateUser,
  getUser,
  getUsers,
  signUpUser,
  toggleFollow,
  getUsersByName,
  resetUnseenNot,
  updateProfileImage,
} = require("./users-controller");
router.post("/", signUpUser);
router.get("/:id", getUser);
router.get("/", getUsers);
router.put("/", updateUser);
router.delete("/:id", deleteUser);
router.post("/follow/:userId/:followId", toggleFollow);
router.get("/names/:userName", getUsersByName);
router.put("/resetUnseenNot/:userId", resetUnseenNot);
router.put("/profileImage", updateProfileImage);

module.exports = router;
