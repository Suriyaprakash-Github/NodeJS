const express = require("express");
const cors = require("cors");
const sequelize = require("./databases/db");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const orderRoutes = require("./routes/orderRoutes");
const ExpenseModel = require("./models/expenseModel");
const UserModel = require("./models/userModel");
const OrderModel = require("./models/orderModel");

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(expenseRoutes);
app.use(orderRoutes);

ExpenseModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(ExpenseModel);
OrderModel.belongsTo(UserModel);
UserModel.hasMany(OrderModel);

sequelize.sync().then().catch();

app.listen(4000, () => {
  console.log("Server running on Port 4000");
});
