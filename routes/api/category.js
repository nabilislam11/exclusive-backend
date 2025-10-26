const express = require("express");
const {
  categoryContoller,
  getAllCategoryContoller,
  getSingleCategoryCongtroller,
  updateCategoryController,
  deleteCategoryController,
} = require("../../controller/categoryController");
const router = express.Router();

router.post("/create-category", categoryContoller);
router.get("/get-allcategories", getAllCategoryContoller);
router.get("/get-singlecategories/:id", getSingleCategoryCongtroller);
router.patch("/update-categories/:id", updateCategoryController);
router.delete("/delete-categories/:id", deleteCategoryController);

module.exports = router;
