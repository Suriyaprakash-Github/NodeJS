const UserModel = require("../models/userModel");

exports.signup = (req, res, next) => {
  username = req.body.username;
  email = req.body.email;
  password = req.body.password;

  if (
    username == null ||
    username.length == 0 ||
    email == null ||
    email.length == 0 ||
    password == null ||
    password.length == 0
  ) {
    res.status(400).json({ error: "something is missing" });
  }

  UserModel.findOne({ where: { email: email } })
    .then((result) => {
      if (result === null) {
        UserModel.create({
          username: username,
          email: email,
          password: password,
        });
      } else {
        res.status(409).json("Email already registered !");
      }
    })
    .then(() => {
      return res.status(201).json({ message: "user Created !!" });
    })
    .catch((err) => console.log(err));
};
