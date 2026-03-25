const nodemailer = require("nodemailer");
const crypto = require("crypto");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
});

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const requestOTP = async (req, res) => {
  const { emailOrMobile } = req.body;
  const identifier = emailOrMobile.includes("@")
    ? emailOrMobile
    : `${emailOrMobile}@example.com`;

  let user = await User.findOne({
    $or: [{ email: identifier }, { phone: emailOrMobile }],
  });
  if (!user) user = new User({ email: identifier, phone: emailOrMobile });

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  await transporter.sendMail({
    to: identifier,
    subject: "Your Login OTP",
    text: `Your 6-digit OTP is ${otp}. Valid for 5 minutes.`,
  });

  res.json({ message: "OTP sent to your email" });
};

const verifyOTP = async (req, res) => {
  const { emailOrMobile, otp } = req.body;
  const identifier = emailOrMobile.includes("@")
    ? emailOrMobile
    : `${emailOrMobile}@example.com`;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: emailOrMobile }],
    });

    if (
      !user ||
      user.otp !== otp ||
      !user.otpExpiresAt ||
      user.otpExpiresAt < new Date()
    ) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Clear OTP
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { requestOTP, verifyOTP };
