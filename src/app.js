const express = require("express");

const app = express(); // here i am creating a express.js application

app.get("/user/:userId", (req, res) => {
  console.log(req.params);
  res.send({ firstName: "Yuv", lastName: "Dholia" });
});

// this will match all the HTTP method API call to /test
app.use("/test", (req, res) => {
  res.send("Main Route handler");
});

app.listen(3000, () => {
  console.log("server is successfully listening on port 3000");
});
