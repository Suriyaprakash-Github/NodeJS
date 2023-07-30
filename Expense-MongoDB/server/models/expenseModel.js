// const sequelize = require("../databases/db");
// const Sequelize = require("sequelize");

// const expenseModel = sequelize.define("expense", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   expense: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   category: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   cost: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//   },
// });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  expense: {
    required: true,
    type: String,
  },
  category: {
    required: true,
    type: String,
  },
  cost: {
    require: true,
    type: Number,
  },
  UserId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Expense", expenseSchema);
