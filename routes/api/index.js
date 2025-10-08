const express = require("express");
const router = express.Router();
const authRoute = require("./auth");
const homeRouter = require("./home");
const adminRouter = require("./admin");
const categoryRouter = require("./category");
const subCategoryRouter = require("./subcategory");

router.use("/authentication", authRoute);
router.use("/home", homeRouter);
router.use("/admin", adminRouter);
router.use("/category", categoryRouter);
router.use("/subcategory", subCategoryRouter);

module.exports = router;
