// const sequelize = require("../databases/db");
// const Sequelize = require("sequelize");

// const orderModel = sequelize.define("purchase", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   paymentId: Sequelize.STRING,
//   orderId: Sequelize.STRING,
//   status: Sequelize.STRING,
// });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  paymentId: { type: String },
  orderId: { type: String },
  status: { type: String },
  UserId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Order", orderSchema);
