const http = require("http");

const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("in middleware");
  next();
});
app.use((req, res, next) => {
  console.log("in 2nd middleware");
  res.send("{ key1: value }");
});

app.listen(4000);
