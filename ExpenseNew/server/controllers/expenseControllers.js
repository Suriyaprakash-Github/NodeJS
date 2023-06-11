const ExpenseModel = require("./../models/expenseModel");

exports.addNewExpense = (req, res, next) => {
  expense = req.body.expense;
  category = req.body.category;
  cost = req.body.cost;

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
  ExpenseModel.findAll()
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => console.log(err));
};
