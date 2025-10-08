const emailValidation = require("../helpers/emailValidation");
const userSchema = require("../model/userSchema");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const emailVarification = require("../helpers/emailVarification");

async function registerController(req, res) {
  console.log(req.body);
  const { fullName, userName, email, password, rule } = req.body;
  if (!fullName) {
    return res.json("FullName is required");
  }
  if (!userName) {
    return res.json("Usernam is required");
  }
  if (!email) {
    return res.json("Email is required");
  }
  if (!emailValidation(email)) {
    return res.json("Email is not valid");
  }
  if (!password) {
    return res.json("Password is required");
  }
  try {
    const existingUser = await userSchema.findOne({ email: email });
    if (existingUser) {
      return res.status(404).json({
        message: "This email is already register",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = new userSchema({
      fullName: fullName,
      userName: userName,
      email: email,
      password: hashPassword,
      rule: rule || user,
    });
    await user.save();
    res.status(201).json({
      message: "Registration successful",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
}
module.exports = registerController;
