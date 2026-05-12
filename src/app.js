const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/User");

const app = express(); // here i am creating a express.js application
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  // creating a new instance of the user model

  await user.save();
  try {
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error in saving the user:" + err.message);
  }
});

// Finding a user by its emailId

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

//delete API
// Find the user by id and delete it

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    if (!user) {
      return res.status(404).send("user not found");
    } else {
      res.send("User deleted successfully");
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// update
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate({ _id: userId }, data);
    res.send("User data updated successfully");
  } catch (err) {
    res.status(500).send("Something went wrong");
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
