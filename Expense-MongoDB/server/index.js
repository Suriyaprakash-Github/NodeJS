// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const cors = require("cors");
// const sequelize = require("./databases/db");
// const userRoutes = require("./routes/userRoutes");
// const expenseRoutes = require("./routes/expenseRoutes");
// const orderRoutes = require("./routes/orderRoutes");
// const ExpenseModel = require("./models/expenseModel");
// const UserModel = require("./models/userModel");
// const OrderModel = require("./models/orderModel");
// const premiumRoutes = require("./routes/premiumRoutes");
// const PasswordResetModel = require("./models/resetPasswordReq");
// const passwordRoutes = require("./routes/passwordRoutes");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const compression = require("compression");

// const app = express();
// app.use(express.json());
// app.use(cors());

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "access.log"),
//   { flags: "a" }
// );

// app.use(helmet());
// app.use(morgan("combined", { stream: accessLogStream }));
// app.use(compression());

// app.use(userRoutes);
// app.use(expenseRoutes);
// app.use(orderRoutes);
// app.use(premiumRoutes);
// app.use(passwordRoutes);

// ExpenseModel.belongsTo(UserModel, { constraints: true, onDelete: "CASCADE" });
// UserModel.hasMany(ExpenseModel);
// OrderModel.belongsTo(UserModel);
// UserModel.hasMany(OrderModel);
// UserModel.hasMany(PasswordResetModel);

// sequelize.sync().then().catch();

// app.listen(process.env.PORT || 4000);

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { User } = require("./../server/models/userModel");

const premiumRoutes = require("./routes/premiumRoutes");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const orderRoutes = require("./routes/orderRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

// const { Expense } = require('./model/expense')
// const { Order } = require('./model/order')
// const { ForgotPassword } = require('./model/forgotPassword')
require("dotenv").config();
// const { Download } = require('./model/download')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(expenseRoutes);
app.use(orderRoutes);
app.use(premiumRoutes);
app.use(passwordRoutes);

mongoose
  .connect(process.env.MONGODBURL)
  .then((res) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));
