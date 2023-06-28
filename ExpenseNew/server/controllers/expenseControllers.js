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

exports.deleteExpense = async (req, res, next) => {
  const tran = await sequelize.transaction();
  let userId = req.body.id;
  console.log(">>>>>>>>>" + userId);
  await ExpenseModel.findByPk(userId).then(async (data) => {
    console.log("got data from here" + data);
    if (data.dataValues.userId === req.user.id) {
      UserModel.findByPk(req.user.id).then(async (Userdata) => {
        Userdata.total -= parseInt(data.amount);
        await tran.commit();
      });
    }
  });

  id = req.body.id;
  ExpenseModel.destroy(
    {
      where: { id: id },
    },
    { transaction: tran }
  )
    .then((result) => {
      tran.commit();
      return res.json(result);
    })
    .catch((err) => {
      tran.rollback();
      console.log(err);
    });
};

exports.allExpense = async (req, res, next) => {
  const numberOfExpenses = req.query.numberOfExpenses;
  const currentPage = req.query.page;
  // console.log(currentPage);
  const offset = numberOfExpenses * currentPage;
  let offsetRows;
  if (offset < 0) {
    offsetRows = 0;
  } else {
    offsetRows = offset;
  }
  const id = req.user.id;

  const totalCount = await ExpenseModel.count({
    where: { userId: id },
    col: "cost",
  });

  if (numberOfExpenses !== "all") {
    await sequelize
      .query(
        `SELECT * FROM expenses WHERE userId=${id} LIMIT ${offsetRows}, ${numberOfExpenses}`,
        {
          model: ExpenseModel,
        }
      )
      .then((result) => {
        return res.json({
          result,
          hasNextPage: 0,
          hasPreviousPage: 0,
        });
      })
      .catch((err) => console.log(err));
  } else {
    await sequelize
      .query(`SELECT * FROM expenses WHERE userId=${id}`, {
        model: ExpenseModel,
      })
      .then((result) => {
        return res.json({
          result,
          hasNextPage: 0,
          hasPreviousPage: 0,
        });
      })
      .catch((err) => console.log(err));
  }
};
