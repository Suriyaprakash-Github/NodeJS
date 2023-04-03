const http = require("http"); //this one is global so

const routes = require("./routes"); //bkz its now locally available to" ./"

const text = routes.someText;

const server = http.createServer(routes.handler);

server.listen(4000);
