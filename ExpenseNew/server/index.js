const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const sequelize = require("./databases/db");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const orderRoutes = require("./routes/orderRoutes");
const ExpenseModel = require("./models/expenseModel");
const UserModel = require("./models/userModel");
const OrderModel = require("./models/orderModel");
const premiumRoutes = require("./routes/premiumRoutes");
const PasswordResetModel = require("./models/resetPasswordReq");
const passwordRoutes = require("./routes/passwordRoutes");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

const app = express();
app.use(express.json());
app.use(cors());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(compression());

app.use(userRoutes);
app.use(expenseRoutes);
app.use(orderRoutes);
app.use(premiumRoutes);
app.use(passwordRoutes);

ExpenseModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
UserModel.hasMany(ExpenseModel);
OrderModel.belongsTo(UserModel);
UserModel.hasMany(OrderModel);
UserModel.hasMany(PasswordResetModel);

sequelize.sync().then().catch();

app.listen(process.env.PORT || 4000);
