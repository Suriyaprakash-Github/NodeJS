const OrderModel = require("../models/orderModel");
const Razorpay = require("razorpay");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const razorpay = new Razorpay({
  key_id: process.env.key_id,
  key_secret: process.env.key_secret,
});
function tokenGenerator(id, email, isPremiumUser) {
  return jwt.sign(
    { userId: id, email: email, isPremiumUser: isPremiumUser },
    "secretkey"
  );
}

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
    .then((result) => {})
    .catch((err) => console.log(err));
};

exports.updatePremium = async (req, res, next) => {
  const tran = await sequelize.transaction();

  const token = req.body.headers.Authorization;
  console.log(token);
  const user = jwt.verify(token, "secretkey");

  const paymentId = req.body.razorpay_payment_id;
  const orderId = req.body.razorpay_order_id;
  const status = req.body.status;

  OrderModel.create(
    {
      paymentId,
      orderId,
      status,
      userId: user.userId,
    },
    {
      transaction: tran,
    }
  )
    .then(async () => {
      if (status !== "failed") {
        UserModel.update(
          { isPremiumUser: 1 },
          { where: { id: user.userId } },
          {
            transaction: tran,
          }
        ).then(async () => {
          await tran.commit();
          return res.status(201).json({
            token: tokenGenerator(
              user.userId,
              user.email,
              (user.isPremiumUser = true)
            ),
          });
        });
      }
    })
    .catch(async (err) => {
      tran.rollback();
      console.log("premum updation failed", err);
    });
};
