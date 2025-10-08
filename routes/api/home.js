const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const router = express.Router();

router.use("/welcome", authMiddleware, (req, res) => {
  console.log(req.userInfo, "info");
  const { userid, fullName, email, rule } = req.userInfo;
  return res.status(200).json({
    success: true,
    messege: "Wlcome to user dashboard",
    data: { id: userid, fullName: fullName, email: email, rule: rule },
  });
});

module.exports = router;
