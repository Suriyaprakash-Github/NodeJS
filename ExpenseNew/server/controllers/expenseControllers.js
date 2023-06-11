const ExpenseModel = require("./../models/expenseModel");
const jwt = require("jsonwebtoken");

exports.addNewExpense = (req, res, next) => {
  expense = req.body.expense;
  category = req.body.category;
  cost = req.body.cost;
  const token = req.body.headers.Authorization;
  const user = jwt.verify(token, "secretkey");

  ExpenseModel.create({
    expense,
    category,
    cost,
    userId: user.userId,
  })
    .then(() => {
      return res.status(201).json({ message: "expense added" });
    })
    .catch((err) => console.log(err));
};

exports.deleteExpense = (req, res, next) => {
  id = req.body.id;
  ExpenseModel.destroy({
    where: { id: id },
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => console.log(err));
};

exports.allExpense = (req, res, next) => {
  ExpenseModel.findAll({ where: { userId: req.user.id } })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => console.log(err));
};
