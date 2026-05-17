const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");

const { validateSignUpData } = require("./utils/validation");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express(); // here i am creating a express.js application
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");

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
