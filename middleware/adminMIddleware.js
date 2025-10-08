function adminMiddleware(req, res, next) {
  console.log("Admin Middleware");
  console.log(req.userInfo.rule, "adminmi");

  if (req.userInfo.rule !== "admin") {
    return res.status(500).json({
      success: false,
      messege: "Access Denied ..Only Admin can access  ",
    });
  }
  next();
}
module.exports = adminMiddleware;
