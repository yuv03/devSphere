const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express(); // here i am creating a express.js application

app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res) => {
  res.send("All user data sent");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data sent");
});

app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted the user");
});

app.listen(3000, () => {
  console.log("server is successfully listening on port 3000");
});
