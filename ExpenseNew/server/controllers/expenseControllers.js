const ExpenseModel = require("./../models/expenseModel");

exports.addNewExpense = (req, res, next) => {
  console.log(req);
  expense = req.body.expense;
  category = req.body.category;
  cost = req.body.cost;
  // userId=req.body.i

  ExpenseModel.create({
    expense,
    category,
    cost,
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
