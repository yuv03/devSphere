const express = require("express");

const app = express(); // here i am creating a express.js application

app.use("/hello", (req, res) => {
  res.send("hello hello helllo from the server");
});

app.use("/test", (req, res) => {
  res.send("hello from the server");
}); // this function is a request handler for a route.

app.listen(3000, () => {
  console.log("server is successfully listening on port 3000");
});
