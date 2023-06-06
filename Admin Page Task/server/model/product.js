const Sequelize = require("sequelize");
const sequelize = require("../data/database");

const Product = sequelize.define("adminProduct", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Product;
