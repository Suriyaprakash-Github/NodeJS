const Sequelize = require("sequelize");
const sequelize = require("../data/database");

const Expense = sequelize.define("expense", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
module.exports = Expense;
