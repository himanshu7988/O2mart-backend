const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    phone: String,
    otp: String,
    otpExpiresAt: Date,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
