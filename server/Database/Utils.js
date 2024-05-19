const mongoose = require("mongoose");
require("dotenv").config();

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@restapi.yer7u2u.mongodb.net/BeeTogether?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {});
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection error: ", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
