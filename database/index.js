const mongoose = require("mongoose");
const { MONGODB_CONNECTION_STRING } = require("../config/index");
const connectionString = MONGODB_CONNECTION_STRING;
const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(connectionString);
    console.log("connected");
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

module.exports = dbConnection;
