const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express(); // here i am creating a express.js application

app.get("/getUserData", (req, res) => {
  // Suppose a logic of DB call and get user data

  try {
    throw new Error("asfsdfsd");
    res.send("User data sent");
  } catch (err) {
    res.status(500).send("Something went wrong with the server");
  }
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

// order of parameters in the handler of middleware matters

app.listen(3000, () => {
  console.log("server is successfully listening on port 3000");
});
