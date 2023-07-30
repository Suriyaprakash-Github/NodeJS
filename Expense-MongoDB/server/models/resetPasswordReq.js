// const sequelize = require("./../databases/db");
// const Sequelize = require("sequelize");

// const ForgotPasswordRequest = sequelize.define("resetPasswordReq", {
//   id: {
//     primaryKey: true,
//     type: Sequelize.UUID,
//     allowNull: false,
//   },
//   isActive: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: true,
//   },
// });

// module.exports = ForgotPasswordRequest;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const forgotPasswordSchema = new Schema({
  isActive: { type: Boolean, required: true },
  UserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});
module.exports = mongoose.model("ForgotPassword", forgotPasswordSchema);
