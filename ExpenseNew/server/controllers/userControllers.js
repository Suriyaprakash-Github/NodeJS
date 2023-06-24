const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const tran = await sequelize.transaction();

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
        UserModel.create(
          {
            username: username,
            email: email,
            password: hash,
          },
          { transaction: tran }
        );
      } else {
        res.status(409).json("Email already registered !");
      }
    })
    .then(async () => {
      await tran.commit();
      return res.status(201).json({ message: "user Created !!" });
    })
    .catch(async (err) => {
      await tran.rollback();
      console.log(err);
    });
};

function tokenGenerator(id, email, isPremiumUser) {
  return jwt.sign(
    { userId: id, email: email, isPremiumUser: isPremiumUser },
    "secretkey"
  );
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
              result.dataValues.email,
              result.dataValues.isPremiumUser
            ),
          });
        }
      }
    })

    .catch((err) => console.log(err));
};
