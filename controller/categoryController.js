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
    messege: "Category create success fully",
    data: category,
  });
}
async function getAllCategoryContller(req, res) {
  try {
    const category = await categorySchema.find().populate("SubCategoryList");
    return res.status(200).json({
      success: true,
      messege: "Successfully get all catogories  ",
      data: category,
    });
  } catch (error) {
    req.status(500).json({
      success: false,
      messege: "Somethings Went Wong",
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
      messege: "Successfully get single catorgies",
      data: singlecategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      messege: "Can't find the single category.",
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
      messege: "Successfully update catorgies",
      data: updatecategories,
    });
  } catch (error) {
    req.status(500).json({
      success: false,
      messege: "Can't update the  category.",
    });
  }
}
async function deleteCategoryController(req, res) {
  const { id } = req.params;
  try {
    const deletecategories = await categorySchema.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      messege: "Successfully delete catorgies",
      data: deletecategories,
    });
  } catch (error) {
    req.status(500).json({
      success: false,
      messege: "Can't delete the  category.",
    });
  }
}

module.exports = {
  categoryContoller,
  getAllCategoryContller,
  getSingleCategoryCongtroller,
  updateCategoryController,
  deleteCategoryController,
};
