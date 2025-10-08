const express = require("express");
const {
  subCategoryController,
  getAllSubCategoryController,
  getSingleSubCategoryController,
  updateSubCategoryController,
} = require("../../controller/subCategoryController");
const router = express.Router();

router.post("/create-subcategory", subCategoryController);
router.get("/get-allsubcategory", getAllSubCategoryController);
router.get("/get-singlesubcategory/:id", getSingleSubCategoryController);
router.patch("/update-subcategory/:id", updateSubCategoryController);

module.exports = router;
