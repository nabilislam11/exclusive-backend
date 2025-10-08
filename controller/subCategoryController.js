const categorySchema = require("../model/categorySchema");
const subCategorySchema = require("../model/subCategorySchema");

async function subCategoryController(req, res) {
  const { name, description, category } = req.body;
  console.log(name, description, category);
  const subcategory = new subCategorySchema({
    name,
    description,
    category,
  });
  await subcategory.save();
  await categorySchema.findByIdAndUpdate(
    category,
    {
      $push: { subcategory: subcategory._id },
    },
    { new: true }
  );
  try {
    return res.status(200).json({
      success: true,
      messege: "Subcategory create Successfully",
      data: category,
    });
  } catch (error) {
    req.status(500).json({
      success: false,
      messege: "Can't create subcategory",
    });
  }
}
async function getAllSubCategoryController(req, res) {
  try {
    const subcategory = await subCategorySchema.find();
    return res.status(200).json({
      success: true,
      messege: "Successfully get all Subcatogories  ",
      data: subcategory,
    });
  } catch (error) {
    req.status(500).json({
      success: false,
      messege: "Can't find all Subcategory",
    });
  }
}
async function getSingleSubCategoryController(req, res) {
  const { id } = req.params;
  try {
    const subcategory = await subCategorySchema.findById(id);
    return res.status(200).json({
      success: true,
      messege: "Successfully get single Subcatogories  ",
      data: subcategory,
    });
  } catch (error) {
    req.status(500).json({
      success: false,
      messege: "Can't find single Subcategory",
    });
  }
}
async function updateSubCategoryController(req, res) {
  const { id } = req.params;
  const { name, description, category } = req.body;

  try {
    const subcategory = await subCategorySchema.findByIdAndUpdate(
      id,
      { $set: { name, description, category } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      messege: "Successfully get single Subcatogories  ",
      data: subcategory,
    });
  } catch (error) {
    req.status(500).json({
      success: false,
      messege: "Can't find single Subcategory",
    });
  }
}

module.exports = {
  subCategoryController,
  getAllSubCategoryController,
  getSingleSubCategoryController,
  updateSubCategoryController,
};
