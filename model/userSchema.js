const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    require: true,
  },
  userName: {
    type: String,
    trim: true,
    require: true,
  },
  email: {
    type: String,
    trim: true,
    require: true,
  },
  password: {
    type: String,
    trim: true,
    require: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  rule: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpire: {
    type: Date,
  },
  otpAttempts: {
    type: Number,
    default: 0,
  },
  lockUntil: {
    type: Date,
  },
  lastOptSend: {
    type: Date,
  },
});
module.exports = mongoose.model("USerList", userSchema);
