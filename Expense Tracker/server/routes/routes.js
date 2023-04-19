const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.post("/expense/newExpense", expenseController.postNewExpense);
router.get("/expense/getExpenses", expenseController.getExpenses);
router.get("/expense/deleteExpense", expenseController.deleteExpense);

module.exports = router;
