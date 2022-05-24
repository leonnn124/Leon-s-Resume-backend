var express = require("express");
var router = express.Router();

const GetMessageMethod = require("../controllers/message_controller");

getMessageMethod = new GetMessageMethod();

router.get("/", getMessageMethod.getMessage);

module.exports = router;
