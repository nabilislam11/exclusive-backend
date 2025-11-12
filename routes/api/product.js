const express = require("express");
const {
  createProductController,
  getAllProductController,
} = require("../../controller/productController");
const multer = require("multer");
const router = express.Router();
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname +
        "-" +
        uniqueSuffix +
        `.${file.originalname.split(".")[1]}`
    );
    console.log(null, file.fieldname + "-" + uniqueSuffix);
    console.log(file.originalname.split(".")[1]);
  },
});

const upload = multer({ storage: storage });

router.post("/create-product", upload.single("image"), createProductController);
router.get("/get-allproduct", getAllProductController);
module.exports = router;
