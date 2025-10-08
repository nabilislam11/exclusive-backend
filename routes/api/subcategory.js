const express = require("express");
const {
  subCategoryController,
  getAllSubCategoryController,
  getSingleSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryCongtroller,
} = require("../../controller/subCategoryController");
const router = express.Router();

router.post("/create-subcategory", subCategoryController);
router.get("/get-allsubcategory", getAllSubCategoryController);
router.get("/get-singlesubcategory/:id", getSingleSubCategoryController);
router.patch("/update-subcategory/:id", updateSubCategoryController);
router.delete("/delete-subcategory/:id", deleteSubCategoryCongtroller);

module.exports = router;
