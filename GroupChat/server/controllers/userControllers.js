const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

function tokenGenerator(id, email, phone) {
  return jwt.sign(
    { userId: id, email: email, phone: phone },
    process.env.JWTSECRETKEY
  );
}

exports.login = (req, res, next) => {
  username = req.body.username;
  email = req.body.email;
  password = req.body.password;
  phone = req.body.phone;
  UserModel.findOne({ where: { email: email } })
    .then((result) => {
      if (result === null) {
        res.status(404).json({ error: "User not found" });
      } else {
        const isPasswordCorrect = bcrypt.compareSync(
          password,
          result.dataValues.password
        );
        if (!isPasswordCorrect) {
          return res.status(401).json({ error: "User not authorized" });
        } else {
          return res.status(201).json({
            message: "logged in",
            token: tokenGenerator(
              result.dataValues.id,
              result.dataValues.email,
              result.dataValues.phone
            ),
          });
        }
      }
    })
    .catch((err) => console.log(err));
};
