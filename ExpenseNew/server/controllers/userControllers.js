const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        UserModel.create({
          username: username,
          email: email,
          password: hash,
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

function tokenGenerator(id, name) {
  return jwt.sign({ userId: id, name: name }, "secretkey");
}

exports.login = (req, res, next) => {
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
        res.status(404).json({ error: "user not found" });
      } else {
        const isPasswordCorrect = bcrypt.compareSync(
          password,
          result.dataValues.password
        );
        if (!isPasswordCorrect) {
          return res.status(401).json({ error: "user not authorized" });
        } else {
          return res.status(201).json({
            message: "logged in",
            token: tokenGenerator(
              result.dataValues.id,
              result.dataValues.username
            ),
          });
        }
      }
    })

    .catch((err) => console.log(err));
};
