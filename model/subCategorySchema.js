const mongoose = require("mongoose");
const { Schema } = mongoose;
const subCategorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true,
  },
  description: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "CategoryList",
    require: true,
  },
});
module.exports = mongoose.model("SubCategoryList", subCategorySchema);
