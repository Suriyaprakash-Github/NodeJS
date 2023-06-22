const sequelize = require("sequelize");
const UserModel = require("../models/userModel");
const ExpenseModel = require("./../models/expenseModel");

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

// grouping:

exports.leaderboard = async (req, res, next) => {
  // await ExpenseModel.findAll({
  //   attributes: [
  //     "userId",
  //     [sequelize.fn("sum", sequelize.col("cost")), "totalCost"],
  //   ],
  //   include: {
  //     model: UserModel,
  //     attributes: ["email"],
  //     required: true,
  //   },
  //   group: "userId",
  // })
  //   .then((result) => {
  //     return res.json(result);
  //   })
  //   .catch((err) => console.log(err));

  await User.findAll({
    attributes: ["email", "totalExpenses"],
  })
    .then((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));

      jsonData.sort((a, b) => b.totalExpenses - a.totalExpenses);
      console.log(jsonData);
      res.json(jsonData);
    })
    .catch((e) => console.log(e));
};
