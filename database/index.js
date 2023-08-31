const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://sp19bscs0038:ansari123@cluster0.mgcjt2g.mongodb.net/coinbounce";
const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(connectionString);
    console.log("connected");
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

module.exports = dbConnection;
