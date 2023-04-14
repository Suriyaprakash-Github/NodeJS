const path = require("path");
const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(4000);
