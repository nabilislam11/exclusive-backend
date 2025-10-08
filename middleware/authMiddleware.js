var jwt = require("jsonwebtoken");
function authMiddleware(req, res, next) {
  //   console.log("auth Middleware");
  //   next();
  console.log(req.headers.authorization);
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token, "token");
  if (!token) {
    return res
      .status(400)
      .json({ success: false, messege: "Access Denied.token is required" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SCRIPT);
    console.log(decodedToken);
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
module.exports = authMiddleware;
