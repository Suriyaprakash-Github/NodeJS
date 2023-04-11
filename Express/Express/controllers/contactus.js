const path = require("path");
const rootDir = require("../util/path");

exports.contactGet = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contactus.html"));
};

exports.contactPost = (req, res, next) => {
  console.log(req.body);
  res.redirect("/success");
};
