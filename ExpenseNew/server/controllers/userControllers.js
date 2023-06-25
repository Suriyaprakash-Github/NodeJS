const UserModel = require("../models/userModel");
const PasswordResetModel = require("./../models/resetPasswordReq");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("./../databases/db");
const Sib = require("sib-api-v3-sdk");
require("dotenv").config();
const uuid = require("uuid");

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
    .then(async (result) => {
      if (result === null) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await UserModel.create(
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
      await tran.commit().then(async () => {
        return res.status(201).json({ message: "user Created !!" });
      });
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

exports.forgotpassword = (req, res, next) => {
  const email = req.body.email;
  UserModel.findOne({ where: { email: email } }).then(async (result) => {
    if (result === null) {
      res.status(404).json({ error: "user not found" });
    } else {
      const userId = result.dataValues.id;
      const id = uuid.v4();
      await PasswordResetModel.create({
        id: id,
        isActive: true,
        userId: userId,
      });

      const client = Sib.ApiClient.instance;
      const apiKey = client.authentications["api-key"];
      apiKey.apiKey = process.env.sendinblue;

      const tranEmailApi = new Sib.TransactionalEmailsApi();
      const sender = {
        email: "yoursgump@gmail.com",
        name: "admin",
      };
      const receiver = [{ email: email }];
      tranEmailApi
        .sendTransacEmail({
          sender,
          to: receiver,
          subject: "Password Reset Link for ExpenseApp",
          textContent: "dummy ",
          htmlContent: `<a href="http://localhost:4000/password/resetpassword/${id}">Reset password</a>`,
        })
        .then((result) => {
          console.log;
        })
        .catch((err) => console.log(err));
    }
  });
};
