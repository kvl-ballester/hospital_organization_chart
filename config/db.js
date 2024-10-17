const mongoose = require("mongoose");
const { logMongoose } = require("../helpers/helpers");

mongoose.set('debug', logMongoose);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/hospital_db");
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
