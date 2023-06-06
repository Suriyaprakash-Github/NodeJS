const cors = require("cors");
const express = require("express");
const productRoutes = require("./routes/routes");

const sequelize = require("./data/database");

const app = express();
app.use(express.json());
app.use(cors());
app.use(productRoutes);
sequelize
  .sync()
  .then()
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log("server running on post 4000");
});
