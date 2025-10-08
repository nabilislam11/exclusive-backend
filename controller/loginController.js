const emailVarification = require("../helpers/emailVarification");
const userSchema = require("../model/userSchema");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

async function loginController(req, res) {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      error: "email is required",
    });
  } else if (!emailVarification(email)) {
    return res.status(400).json({
      messege: "Email is not valid",
    });
  }
  if (!password) {
    return res.status(400).json({ messege: "Password is required" });
  }
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ messege: "This email is not registered with us." });
    }
    if (!user.verified) {
      return res
        .status(401)
        .json({ messege: "Email is not verified.Please verify your email " });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ messege: "Wrong password" });
    }
    const accessToken = jwt.sign(
      {
        userid: user._id,
        fullName: user.fullName,
        email: user.email,
        rule: user.rule,
      },
      process.env.JWT_SCRIPT,
      {
        expiresIn: "10m",
      }
    );
    res.status(200).json({
      messege: "Login successful",
      data: user,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({ messege: "Server error" });
  }
}
module.exports = loginController;
