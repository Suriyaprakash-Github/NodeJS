const express = require("express");
const cors = require("cors");
const sequelize = require("./database/db");

// routes
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRoutes);

sequelize.sync({ force: true }).then().catch();

app.listen(4000, () => {
  console.log("server running on port 4000");
});
