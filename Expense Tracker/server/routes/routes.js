const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.post("/expense/newExpense", expenseController.postNewExpense);

module.exports = router;
