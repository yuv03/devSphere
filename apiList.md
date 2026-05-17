# DevSphere APIs

authRouter

- POST /signup
- POST /login
- POST /logout

profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed - gets you the profile of other users on platform

Status: ignore, interested, accepted, rejected

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
const user = await User.findByIdAndDelete({ \_id: userId });
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
app.patch("/user/:userId", async (req, res) => {
const userId = req.params?.userId;
const data = req.body;

try {
const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
const isUpdateAllowed = Object.keys(data).every((k) =>
ALLOWED_UPDATES.includes(k),
);

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User data updated successfully");

} catch (err) {
res.status(500).send("Something went wrong: " + err.message);
}
});
