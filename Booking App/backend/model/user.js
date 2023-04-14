const Sequelize = require("sequelize");
const sequelize = require("../data/database");

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncremeant: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = User;
