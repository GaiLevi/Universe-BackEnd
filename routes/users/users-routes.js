var express = require("express");
var router = express.Router();
const {
  deleteUser,
  updateUser,
  getUser,
  getUsers,
  signUpUser,
} = require("./users-controller");
router.post("/", signUpUser);
router.get("/:id", getUser);
router.get("/", getUsers);
router.put("/", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
