const express = require("express");
const contactControllers = require("../controllers/contactus");

const router = express.Router();

router.get("/contactus", contactControllers.contactGet);
router.post("/contactus", contactControllers.contactPost);

module.exports = router;
