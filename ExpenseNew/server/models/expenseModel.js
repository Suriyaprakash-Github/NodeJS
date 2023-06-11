const sequelize = require("../databases/db");
const Sequelize = require("sequelize");

const expenseModel = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  expense: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = expenseModel;
