const productSchema = require("../model/productSchema");

async function createProductController(req, res) {
  const { name, description, category, price, image } = req.body;
  console.log(name, description, category, price, image);

  // get the uploaded file name
  const imageName = req.file.filename;
  try {
    const product = await new productSchema({
      name,
      description,
      image: `http://localhost:3000/uploads/${imageName} `,
      price,
      category,
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
module.exports = createProductController;
