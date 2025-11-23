const uploadImage = require("../helpers/cloudinary");
const productSchema = require("../model/productSchema");

async function createProductController(req, res) {
  const {
    name,
    description,
    category,
    price,
    image,
    rating,
    quantity,
    stock,
    newprice,
    subcategory,
    discount,
  } = req.body;
  console.log(
    name,
    description,
    category,
    price,
    quantity,
    stock,
    rating,
    image,
    discount,
    subcategory
  );

  // get the uploaded file name
  // const imageName = req.file.filename;
  const imgPath = req.file.path;
  console.log(imgPath);
  const imgUrl = await uploadImage(imgPath);
  console.log(imgUrl, "img");
  try {
    const product = await new productSchema({
      name,
      description,
      image: imgUrl.secure_url,
      price,
      rating,
      quantity,
      stock,
      newprice,
      discount,
      category,
      subcategory,
    });
    await product.save();
    return res.status(200).json({
      success: true,
      message: "Product create Successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't create Product",
      error: error.message,
    });
  }
}
async function getAllProductController(req, res) {
  try {
    const page = req.query.page;
    console.log(page, "Page");
    const size = req.query.size;
    console.log(size, "Size");
    const skip = (page - 1) * size;
    console.log(skip);

    const totalPoduct = await productSchema.countDocuments({});
    console.log(totalPoduct, "TotalProduct");

    const product = await productSchema
      .find()
      .limit(size)
      .skip(skip)
      .populate({
        path: "category",
        populate: {
          path: "subcategory",
        },
      })
      .populate("subcategory");
    return res.status(200).json({
      success: true,
      message: "Successfully get all Product  ",
      data: product,
      total: totalPoduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Can't find all Product",
      error: error.message,
    });
  }
}

module.exports = { createProductController, getAllProductController };
