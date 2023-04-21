const Expense = require("../model/expense");

exports.postNewExpense = (req, res, next) => {
  const name = req.body.name;
  const amount = req.body.amount;
  const category = req.body.category;
  Expense.create({
    name: name,
    amount: amount,
    category: category,
  })
    .then((result) => {
      return res.json({ expense: result.dataValues });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expenses) => res.json(expenses))
    .catch((err) => console.log(err));
};

exports.deleteExpense = (req, res, next) => {
  const id = req.query.id;
  Expense.findByPk(id)
    .then((expense) => {
      return expense.destroy();
    })
    .then((result) => {
      console.log("user deleted");
      res.redirect("http://localhost:3000");
    })
    .catch((err) => {
      console.log(err);
    });
};
