var express = require("express");
var router = express.Router();
const { login, logout, getLoggedUser } = require("./auth-controller");
router.post("/", login);
router.post("/logout", logout);
router.get("/", getLoggedUser);
module.exports = router;
