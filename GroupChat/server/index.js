const express = require("express");
const cors = require("cors");

const sequelize = require("./database/db");
const UserModel = require("./models/userModel");
const MessageModel = require("./models/messageModel");

// routes
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use(messageRoutes);

// associations
UserModel.hasMany(MessageModel);
MessageModel.belongsTo(UserModel);

sequelize.sync().then().catch();

app.listen(4000, () => {
  console.log("server running on port 4000");
});
