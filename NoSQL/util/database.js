const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const sequelize = new Sequelize("node-complete", "root", "nodecomplete", {
  dialect: "mysql",
const mongoConnect = (callback) => {
  MongoClient.connect(process.env.DBURL)
    .then((client) => {
      console.log("connected");
      _db = client.db("shop");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
      throw err;
});

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
