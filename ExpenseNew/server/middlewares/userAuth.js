const jwt = require("jsonwebtoken");
const UserModel = require("./../models/userModel");

exports.authenticate = (req, res, next) => {
  const token = req.header("Authorization");
  //   console.log(token);
  const user = jwt.verify(token, "secretkey");
  //   console.log(user.userId);
  UserModel.findByPk(user.userId)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
};
