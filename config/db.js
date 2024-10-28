const mongoose = require("mongoose");
const { logMongoose, logInfo } = require("../helpers/helpers");

mongoose.set('debug', logMongoose);

const connectDB = async () => {
  const mongoURI = process.env.MONGO_DB_URI || "mongodb://localhost:27017/clinic_db"
  try {
    logInfo(`Connecting to ${mongoURI}`)
    await mongoose.connect(mongoURI);
    logInfo('MongoDB connected')
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
