const mongoose = require("mongoose");
const { logMongoose, logInfo } = require("../helpers/helpers");

mongoose.set('debug', logMongoose);

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/hospital_db");
    logInfo('MongoDB connected')
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
