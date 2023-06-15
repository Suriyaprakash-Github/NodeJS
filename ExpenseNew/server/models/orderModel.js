const sequelize = require("../databases/db");
const Sequelize = require("sequelize");

const orderModel = sequelize.define("purchase", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  paymentId: Sequelize.STRING,
  orderId: Sequelize.STRING,
  status: Sequelize.STRING,
});

module.exports = orderModel;
