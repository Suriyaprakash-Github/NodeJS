const path = require("path");
const rootDir = path.dirname(require.main.filename);
const User = require("../model/user");

// exports.getAppointments = (req, res, next) => {
//   User.findAll()
//     .then((users) => {
//       res.json(users);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// exports.getAppointmentPage = (req, res, next) => {
//   res.sendFile(path.join(rootDir, "views", "index.html"));
// };

exports.postNewUser = (req, res, next) => {
  // console.log(req.body.name);
  // console.log("reached controller", req.body);
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  User.create({
    name: name,
    phone: phone,
    email: email,
  })
    .then((result) => {
      // console.log(result);
      return res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
};

// exports.deleteUser = (req, res, next) => {
//   const id = req.query.id;
//   User.findByPk(id)
//     .then((user) => {
//       return user.destroy();
//     })
//     .then((result) => {
//       console.log("user deleted");
//       res.redirect("http://localhost:3000");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
