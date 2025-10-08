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
      message: "Subcategory create Successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't create subcategory",
    });
  }
}
async function getAllSubCategoryController(req, res) {
  try {
    const subcategory = await subCategorySchema.find();
    return res.status(200).json({
      success: true,
      message: "Successfully get all Subcatogories  ",
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't find all Subcategory",
    });
  }
}
async function getSingleSubCategoryController(req, res) {
  const { id } = req.params;
  try {
    const subcategory = await subCategorySchema.findById(id);
    return res.status(200).json({
      success: true,
      message: "Successfully get single Subcatogories  ",
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't find single Subcategory",
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
    await categorySchema.findByIdAndUpdate(category, {
      $push: { subcategory: subcategory._id },
    });

    return res.status(200).json({
      success: true,
      message: "Successfully get single Subcatogories  ",
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't find single Subcategory",
    });
  }
}
async function deleteSubCategoryCongtroller(req, res) {
  const { id } = req.params;
  try {
    const subcategory = await subCategorySchema.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Successfully delete Subcatogories  ",
      data: subcategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't delete the Subcategory",
    });
  }
}

module.exports = {
  subCategoryController,
  getAllSubCategoryController,
  getSingleSubCategoryController,
  updateSubCategoryController,
  deleteSubCategoryCongtroller,
};
