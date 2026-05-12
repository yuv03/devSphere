const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");

const app = express(); // here i am creating a express.js application

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Yuv",
    lastName: "Dholia",
    emailId: "jsbfkjsdhjfk@abc.com",
    password: "abc123",
  });
  // creating a new instance of the user model

  await user.save();
  try {
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error in saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("server is successfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
