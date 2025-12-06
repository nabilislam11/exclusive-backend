const mongoose = require("mongoose");
const { Schema } = mongoose;
const orderSchema = new Schema({
  fullName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    trim: true,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    trim: true,
    require: true,
  },
  postCode: {
    type: String,
    trim: true,
    require: true,
  },
  totalPrice: {
    type: String,
    trim: true,
    require: true,
  },
  product: {
    type: Array,
  },
});
module.exports = mongoose.model("orderlist", orderSchema);
