const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseControllers");

router.post("/expense/addexpense", expenseController.addNewExpense);
router.post("/expense/delete", expenseController.deleteExpense);
router.get("/expense/allexpenses", expenseController.allExpense);

module.exports = router;
