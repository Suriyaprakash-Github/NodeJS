const sequelize = require("sequelize");
const UserModel = require("../models/userModel");
const ExpenseModel = require("./../models/expenseModel");
const AWS = require("aws-sdk");
require("dotenv").config();

// exports.leaderboard = async (req, res, next) => {
//   await ExpenseModel.findAll({
//     attributes: ["category", "cost"],
//     include: {
//       model: UserModel,
//       attributes: ["email"],
//       required: true,
//     },
//   })
//     .then((result) => {
//       const sortedArray = result.sort((a, b) => {
//         return a.cost - b.cost;
//       });
//       return res.json(sortedArray);
//     })
//     .catch((err) => console.log(err));
// };

// grouping:

exports.leaderboard = async (req, res, next) => {
  // await ExpenseModel.findAll({
  //   attributes: [
  //     "userId",
  //     [sequelize.fn("sum", sequelize.col("cost")), "totalCost"],
  //   ],
  //   include: {
  //     model: UserModel,
  //     attributes: ["email"],
  //     required: true,
  //   },
  //   group: "userId",
  // })
  //   .then((result) => {
  //     return res.json(result);
  //   })
  //   .catch((err) => console.log(err));

  await User.findAll({
    attributes: ["email", "totalExpenses"],
  })
    .then((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));

      jsonData.sort((a, b) => b.totalExpenses - a.totalExpenses);
      console.log(jsonData);
      res.json(jsonData);
    })
    .catch((e) => console.log(e));
};

function uploadToS3(data, filename) {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const IAM_USER_KEY = process.env.IAM_USER_KEY;
  const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        console.log("Somethin went wrong", err);
        reject(err);
      } else {
        console.log("SUCESS", s3response);
        resolve(s3response.Location);
      }
    });
  });
}

exports.download = async (req, res, next) => {
  const data = await ExpenseModel.findAll({ where: { userId: req.user.id } });
  const stringfiedExpenses = JSON.stringify(data);
  const userId = req.user.id;
  const filename = `Expense${userId}/${new Date()}.txt`;
  const fileURL = await uploadToS3(stringfiedExpenses, filename);
  res.status(200).json({ fileURL, sucess: true });
};
