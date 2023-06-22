// const Sequelize = require("sequelize");
// // const OrderModel = require("../models/orderModel");
// const UserModel = require("../models/userModel");
// const ExpenseModel = require("./../models/expenseModel");

// exports.leaderboard = async (req, res, next) => {
//   await ExpenseModel.findAll({
//     attributes: ["category", "cost"],
//     include: {
//       model: UserModel,
//       attributes: ["email"],
//       required: true,
//     },
//   })
//     .then((result) => {
//       const sortedArray = result.sort((a, b) => {
//         return a.cost - b.cost;
//       });
//       return res.json(sortedArray);
//     })
//     .catch((err) => console.log(err));
// };

const sequelize = require("./../databases/db");
const UserModel = require("../models/userModel");
const ExpenseModel = require("./../models/expenseModel");

exports.leaderboard = async (req, res, next) => {
  await ExpenseModel.findAll({
    attributes: [
      "userId",
      [sequelize.fn("sum", sequelize.col("cost")), "totalCost"],
    ],
    include: {
      model: UserModel,
      attributes: ["email"],
      required: true,
    },
    group: "userId",
  })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => console.log(err));
};
