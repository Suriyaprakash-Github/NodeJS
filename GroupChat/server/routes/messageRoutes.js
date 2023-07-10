const express = require("express");
const router = express.Router();
const authUser = require("./../middlewares/userAuth");
const MessageController = require("./../controllers/messageController");

router.post("/sendmsg", authUser.authenticate, MessageController.sendMessage);

// router.get("/getgroupmessages/:groupId",userAuth.authenticate,messageController.getGroupMessages);

module.exports = router;
