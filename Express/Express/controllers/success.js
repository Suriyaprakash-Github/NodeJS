const path = require("path");
const rootDir = require("../util/path");

exports.success = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "success.html"));
};
