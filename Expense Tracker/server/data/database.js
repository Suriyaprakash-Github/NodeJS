const Sequelize = require("sequelize");
const sequelize = new Sequelize("expense_app", "root", "1@mLegend", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
