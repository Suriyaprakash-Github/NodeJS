const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const DB = require("./util/database");
// const ForgotPassword = require("./models/forgotpassword");

const User = require("./models/user");
const Message = require("./models/message");
const Group = require("./models/group");
const Usergroup = require("./models/usergroup");

const app = express();
require("dotenv").config();

// dependencies to get user input
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// realtions between each other;
// User.hasMany(ForgotPassword);

User.hasMany(Message);
Message.belongsTo(User);

Group.belongsToMany(User, { through: Usergroup });
User.belongsToMany(Group, { through: Usergroup });

Group.hasMany(Message);
Message.belongsTo(Group);

const port = process.env.port || 5000;

const userRoutes = require("./routes/user");
app.use("/user", userRoutes);

const msgRoutes = require("./routes/message");
app.use("/message", msgRoutes);

const passwordRoutes = require("./routes/password");
app.use("/password", passwordRoutes);

const groupRoutes = require("./routes/group");
app.use("/group", groupRoutes);

const mediaRoutes = require("./routes/media");
app.use("/media", mediaRoutes);

DB.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));
