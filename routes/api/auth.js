const express = require("express");
const router = express.Router();
const { sendOtp, verifyOtp } = require("../../controller/otpController");
const loginController = require("../../controller/loginController");
const registerController = require("../../controller/registerController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
