const express = require("express");
const {
  categoryContoller,
  getAllCategoryContller,
  getSingleCategoryCongtroller,
  updateCategoryController,
  deleteCategoryController,
} = require("../../controller/categoryController");
const router = express.Router();

router.post("/create-category", categoryContoller);
router.get("/get-allcategories", getAllCategoryContller);
router.get("/get-singlecategories/:id", getSingleCategoryCongtroller);
router.patch("/update-categories/:id", updateCategoryController);
router.delete("/delete-categories/:id", deleteCategoryController);

module.exports = router;
