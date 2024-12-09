const mongoose = require("mongoose");

const VerifySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const VerifyToken = mongoose.model("VerifyToken", VerifySchema);
module.exports = VerifyToken;
