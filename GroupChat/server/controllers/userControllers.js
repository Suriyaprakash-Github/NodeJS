const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.signup = (req, res, next) => {
  username = req.body.username;
  email = req.body.email;
  password = req.body.password;
  phone = req.body.phone;

  UserModel.findOne({ where: { email: email } })
    .then((result) => {
      if (result === null) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        UserModel.create({
          username: username,
          email: email,
          password: hash,
          phone: phone,
        });
      } else {
        res.status(409).json("Email already registered");
      }
    })

    .then((result) => {
      return res.status(201).json(result);
    })
    .catch((err) => console.log(err));
};
