const sequelize = require("./../databases/db");
const Sequelize = require("sequelize");

const ForgotPasswordRequest = sequelize.define("resetPasswordReq", {
  id: {
    primaryKey: true,
    type: Sequelize.UUID,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = ForgotPasswordRequest;
