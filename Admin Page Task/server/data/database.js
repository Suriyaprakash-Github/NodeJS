const Sequelize = require("sequelize");

const sequelize = new Sequelize("adminProduct", "root", "1@mLegend", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
