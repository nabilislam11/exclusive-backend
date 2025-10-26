const categorySchema = require("../model/categorySchema");

function categoryContoller(req, res) {
  const { name, description } = req.body;
  console.log(name, description);
  const category = new categorySchema({
    name,
    description,
  });
  category.save();
  return res.status(200).json({
    success: true,
    message: "Category create success fully",
    data: category,
  });
}
async function getAllCategoryContoller(req, res) {
  try {
    const getallategory = await categorySchema
      .find()
      .populate("subcategory", "name");

    return res.status(200).json({
      success: true,
      message: "Successfully get all catogories  ",
      data: getallategory,
    });
  } catch (error) {
    console.error("Error in getAllCategoryContoller:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
async function getSingleCategoryCongtroller(req, res) {
  console.log(req, res);
  const { id } = req.params;
  try {
    const singlecategory = await categorySchema.findById(id);
    return res.status(200).json({
      success: true,
      message: "Successfully get single catorgies",
      data: singlecategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}
async function updateCategoryController(req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  console.log(name, description);

  try {
    const updatecategories = await categorySchema.findByIdAndUpdate(
      id,
      { $set: { name, description } },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Successfully update catorgies",
      data: updatecategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't update the  category.",
    });
  }
}
async function deleteCategoryController(req, res) {
  const { id } = req.params;
  try {
    const deletecategories = await categorySchema.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Successfully delete catorgies",
      data: deletecategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't delete the  category.",
    });
  }
}

module.exports = {
  categoryContoller,
  getAllCategoryContoller,
  getSingleCategoryCongtroller,
  updateCategoryController,
  deleteCategoryController,
};
