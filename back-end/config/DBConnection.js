const mongoose = require("mongoose");

module.exports = async function DbConnection() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION);
    console.log("Connected To mongoDB ^_^");
  } catch (error) {
    console.log("Database Error:", error);
    process.exit(1);
  }
};
