var express = require("express");
var router = express.Router();

const GetMessageMethod = require("../controllers/message_controller");

getMessageMethod = new GetMessageMethod();

router.get("/", getMessageMethod.getMessage);

router.patch("/add", getMessageMethod.addMessage);

router.delete("/delete", getMessageMethod.deleteMessage);

router.put("/update", getMessageMethod.updateMessage);

router.post("/filter", getMessageMethod.filterMessage);

module.exports = router;
