const Expense = require("../model/expense");

exports.postNewExpense = (req, res, next) => {
  const name = req.body.name;
  const amount = req.body.amount;
  const category = req.body.category;
  console.log("inside controller", name, amount, category);
  Expense.create({
    name: name,
    amount: amount,
    category: category,
  })
    .then((result) => {
      return res.redirect("http://localhost:3000");
    })
    .catch((error) => {
      console.log(error);
    });
};
