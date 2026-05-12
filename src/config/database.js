const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://yuvraj:yuvraj123@cluster0.yg9tcse.mongodb.net/devSphere",
  );
};

module.exports = connectDB;
