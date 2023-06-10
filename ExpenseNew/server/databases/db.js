const Sequelize = require("sequelize");

const sequelize = new Sequelize("expensenew", "root", "1@mLegend", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
