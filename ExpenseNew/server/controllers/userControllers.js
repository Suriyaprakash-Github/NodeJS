const UserModel = require("../models/userModel");

exports.signup = (req, res, next) => {
  username = req.body.username;
  email = req.body.email;
  password = req.body.password;

  UserModel.findOne({ where: { email: email } })
    .then((result) => {
      if (result === null) {
        UserModel.create({
          username: username,
          email: email,
          password: password,
        });
      } else {
        res.status(409).json("Email already registered");
      }
    })

    .then((result) => {
      return res.json(result);
    })
    .catch((err) => console.log(err));
};
