const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseControllers");
const authUser = require("./../middlewares/userAuth");

router.post("/expense/addexpense", expenseController.addNewExpense);
router.post("/expense/delete", expenseController.deleteExpense);
router.get(
  "/expense/allexpenses",
  authUser.authenticate,
  expenseController.allExpense
);

module.exports = router;
