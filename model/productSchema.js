const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
  },
  stock: {
    type: String,
  },
  discount: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  sold: {
    type: Number,
  },
  image: {
    type: String,
  },
  reting: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "categoryList",
  },
});
module.exports = mongoose.model("productList", productSchema);
