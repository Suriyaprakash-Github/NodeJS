const ExpenseModel = require("./../models/expenseModel");
const UserModel = require("./../models/userModel");
const sequelize = require("./../databases/db");
const jwt = require("jsonwebtoken");

exports.addNewExpense = async (req, res, next) => {
  expense = req.body.expense;
  category = req.body.category;
  cost = req.body.cost;
  const token = req.body.headers.Authorization;
  const user = jwt.verify(token, "secretkey");

  const tran = await sequelize.transaction();

  ExpenseModel.create(
    {
      expense,
      category,
      cost,
      userId: user.userId,
    },
    {
      transaction: tran,
    }
  );
  UserModel.findByPk(user.userId, {
    transaction: tran,
  })
    .then((data) => {
      data.totalExpenses += parseInt(cost);
      data.save();
      tran.commit();
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
