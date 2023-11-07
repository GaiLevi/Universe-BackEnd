var express = require("express");
var router = express.Router();
const { toggleNotification } = require("./notification-controller");
router.post("/", toggleNotification);
module.exports = router;
