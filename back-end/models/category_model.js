const mongoose = require("mongoose");

const CatgeorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", CatgeorySchema);
module.exports = Category;
