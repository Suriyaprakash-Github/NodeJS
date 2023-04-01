const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    fs.readFile("message.txt", { encoding: "utf-8" }, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(data);
      res.write("<html>");
      res.write("<head><title>From</title></head>");
      res.write(`<body>${data}</body>`);
      res.write(
        '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>'
      );
      res.write("</html>");
      return res.end();
    });
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    }); //eventlistner
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      // console.log(parsedBody);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302; //302 status code refer to redirect
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  } else {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>First page</title></head>");
    res.write("<body><h1>FIRST PAGE SHESHHH</h1></body>");
    res.write("</html>");
    res.end();
  }
};

// module.exports = requestHandler;

// module.exports.handler = requestHandler;
// module.exports.someText = "Some text here"

// module.exports = {
//     handler : requestHandler,
//     someText : 'Some text here'
// }

exports.handler = requestHandler;
exports.someText = "Some text here";
