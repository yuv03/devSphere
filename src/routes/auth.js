const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authRouter = express.Router();
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
  // Validation of data
  validateSignUpData(req);

  const { firstName, lastName, emailId, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    emailId,
    password: hashedPassword,
  });
  // creating a new instance of the user model

  await user.save();
  try {
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Invalid Credentials");
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else {
      // create a JWT token

      const token = await user.getJWT();

      // Add the token to cookie and send the response back to the user
      res
        .cookie("token", token, {
          expires: new Date(Date.now() + 8 * 3600000), // cookie will be removed after 8 hours
        })
        .send("Login Successful!!");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("Logged Out Successfully!");
});

module.exports = authRouter;
