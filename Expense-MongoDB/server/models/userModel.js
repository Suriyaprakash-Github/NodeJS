// const sequelize = require("../databases/db");
// const Sequelize = require("sequelize");

// const userModel = sequelize.define("user", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   isPremiumUser: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//     allowNull: false,
//   },
//   totalExpenses: {
//     type: Sequelize.INTEGER,
//     defaultValue: 0,
//   },
// });

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  premium: { type: Boolean },
  totalExpense: { type: Number, required: true },
});

module.exports = mongoose.model("User", userSchema);
