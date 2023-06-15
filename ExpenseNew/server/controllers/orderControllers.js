const OrderModel = require("../models/orderModel");
const Razorpay = require("razorpay");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});

exports.purchasePremiun = async (req, res, next) => {
  const token = req.body.headers.Authorization;
  const user = jwt.verify(token, "secretkey");

  const options = {
    amount: 50000,
    currency: "INR",
  };
  await razorpay.orders
    .create(options)
    .then((response) => {
      return res.json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
};

exports.updatePremium = (req, res, next) => {
  const token = req.body.headers.Authorization;
  console.log(token);
  const user = jwt.verify(token, "secretkey");

  const paymentId = req.body.razorpay_payment_id;
  const orderId = req.body.razorpay_order_id;
  // const signature = req.body.razorpay_signature;
  const status = req.body.status;

  OrderModel.create({
    paymentId,
    orderId,
    status,
    userId: user.userId,
  })
    .then(() => {
      UserModel.update({ isPremiumUser: 1 }, { where: { id: user.userId } });
    })
    .catch((err) => console.log("premum updation failed", err));
};
