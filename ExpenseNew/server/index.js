const express = require("express");
const cors = require("cors");
const sequelize = require("./databases/db");
const userRoutes = require("./routes/userRoutes");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(expenseRoutes);

sequelize.sync().then().catch();

app.listen(4000, () => {
  console.log("Server running on Port 4000");
});
