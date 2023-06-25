const PasswordResetModel = require("./../models/resetPasswordReq");
const UserModel = require("./../models/userModel");
const bcrypt = require("bcrypt");

exports.resetpassword = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await PasswordResetModel.findOne({ where: { id } }).then(
    async (forgotpasswordrequest) => {
      if (forgotpasswordrequest) {
        await PasswordResetModel.update(
          { isActive: false },
          { where: { id: id } }
        )
          .then((result) =>
            res.redirect(`http://localhost:3000/password/resetpassword/${id}`)
          )
          .catch((err) => console.log(err));
      }
    }
  );
};

exports.updatePassword = async (req, res, next) => {
  const id = req.body.id;
  const updatepassword = req.body.updatepassword;
  await PasswordResetModel.findOne({ where: { id: id } }).then(
    async (result) => {
      if (result !== null) {
        // console.log(result.userId);
        UserModel.findOne({ where: { id: result.userId } }).then(
          async (result) => {
            //   console.log(result.email);
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(updatepassword, salt);
            await UserModel.update(
              { password: hash },
              { where: { id: result.id } }
            )
              .then(() => {
                return res.json("password changed");
              })
              .catch((err) => console.log(err));
          }
        );
      }
    }
  );
};
