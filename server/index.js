const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});
port = 8000;
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
