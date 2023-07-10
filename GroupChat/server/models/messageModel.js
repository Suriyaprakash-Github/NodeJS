const sequelize = require("../database/db");
const Sequelize = require("sequelize");

const messageModel = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = messageModel;
