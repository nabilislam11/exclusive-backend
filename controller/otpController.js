const emailVarification = require("../helpers/emailVarification");
const userSchema = require("../model/userSchema");
const crypto = require("crypto");

// res.status(200).json({})

// *✅ Success
// 200 OK        → Successful fetch/update/delete
// 201 Created   → New resource/document created
// 204 No Content→ Success, nothing to return (e.g. delete)

// !⚠️ Client Errors
// 400 Bad Request → Invalid input / missing fields / expired OTP
// 401 Unauthorized → No or invalid auth (JWT, session, etc.)
// 403 Forbidden   → Authenticated but not allowed / account locked
// 404 Not Found   → Document or resource doesn’t exist
// 409 Conflict    → Duplicate entry (unique field like email)
// 429 Too Many Requests → Rate limit exceeded (e.g. OTP/email spam)

// !❌ Server Errors
// 500 Internal Server Error → Unexpected bug / DB error
// 502 Bad Gateway           → Server got invalid response (upstream/downstream issue)
// 503 Service Unavailable   → DB down / service temporarily overloaded
// 504 Gateway Timeout       → DB or external service took too long
// */

// const otp = crypto.randomInt(10000, 99999).toString();
//     console.log(otp);
//     const otpExpire = new Date(Date.now() + 5 * 1000 * 60);
//     console.log(otpExpire);
//  emailVarification(email, otp);
///route 4. register,login, requestotp ,verify otp,

async function sendOtp(req, res) {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      error: "email is required",
    });
  }
  try {
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ messege: "This email is not registert with us" });
    }
    if (user.verified) {
      return res
        .status(404)
        .json({ messege: "Your account is already verified" });
    }
    //lockuntil = current time + 10 minute
    if (user.lockUntil && user.lockUntil > new Date()) {
      return res
        .status(404)
        .json({ messege: "Your account is locked. You must wait" });
    }
    if (user.lastOptSend && user.lastOptSend.getTime() > Date.now() - 60000) {
      return res.status(404).json({
        messege: `1 minutes cool down  ${(
          60 -
          (Date.now() - user.lastOptSend.getTime()) / 1000
        ).toFixed(1)}second`,
      });
    }

    const otp = crypto.randomInt(10000, 99999).toString();

    await userSchema.findOneAndUpdate(
      { email },
      {
        otp,
        otpExpire: new Date(Date.now() + 2 * 1000 * 60),
        lastOptSend: new Date(),
        lockUntil: null,
      },
      { new: true }
    );
    await emailVarification(email, otp);
    res.status(200).json({
      successe: "Otp send successfull",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
    });
  }
}
///-----------------------------------------

async function verifyOtp(req, res) {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ messege: " email & otp are require " });
  }
  try {
    const user = await userSchema.findOne({ email });

    console.log(email, otp);
    if (!user) {
      return res.status(404).json({ error: "user not find" });
    }

    if (user.verified) {
      return res.status(400).json({ error: "This email is already verified" });
    }
    if (user.lockUntil && user.lockUntil > new Date()) {
      return res
        .status(404)
        .json({ messege: "Your account is locked. You must wait" });
    }
    if (!user.otp || !user.otpExpire) {
      return res.status(400).json({
        error:
          "req new otp cause in DB these fields(otp , otpExpire) not exist",
      });
    }

    // otpexpire => 2min future a
    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ error: "otp is expired" });
    }

    const isMatch = user.otp === otp; //checking otp match

    if (!isMatch) {
      user.otpAttempts += 1;

      if (user.otpAttempts >= 3) {
        user.lockUntil = new Date(Date.now() + 10 * 60 * 1000); //lock for 10min
      }
      await user.save();
      return res.status(400).json({
        messege: "invalid otp",
      });
    }

    await userSchema.findOneAndUpdate(
      { email },
      {
        $set: { verified: true, otpAttempts: 0 },
        $unset: { otp: "", otpExpire: "", lockUntil: "", lastOptSend: "" },
      },
      { new: true }
    );
    res.json({
      messege: "user verified",
    });
  } catch (error) {
    return res.status(500).json({ messege: "Server error " });
  }
}

module.exports = { verifyOtp, sendOtp };
