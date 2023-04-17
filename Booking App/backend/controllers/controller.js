const path = require("path");
const rootDir = path.dirname(require.main.filename);
const User = require("../model/user");

exports.getAppointments = (req, res, next) => {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewUser = (req, res, next) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  User.create({
    name: name,
    phone: phone,
    email: email,
  })
    .then((result) => {
      return res.redirect("http://localhost:3000");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deleteUser = (req, res, next) => {
  const id = req.query.id;
  User.findByPk(id)
    .then((user) => {
      return user.destroy();
    })
    .then((result) => {
      console.log("user deleted");
      res.redirect("http://localhost:3000");
    })
    .catch((err) => {
      console.log(err);
    });
};
