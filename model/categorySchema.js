const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  description: {
    type: String,
  },
  subcategory: [
    {
      type: Schema.Types.ObjectId,
      ref: "SubCategoryList",
    },
  ],
});
module.exports = mongoose.model("CategoryList", categorySchema);
