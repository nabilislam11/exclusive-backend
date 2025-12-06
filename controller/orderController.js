const orderSchema = require("../model/orderSchema");
const SSLCommerzPayment = require("sslcommerz-lts");
const { ObjectId } = require("mongodb");
const store_id = "nabil6933597b702bc";
const store_passwd = "nabil6933597b702bc@ssl";
const is_live = false; //true for live, false for sandbox

async function orderController(req, res) {
  const tran_id = new ObjectId().toString();
  console.log(tran_id);
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    city,
    postCode,
    totalPrice,
    products,
  } = req.body;
  const data = {
    total_amount: totalPrice,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: "http://localhost:3030/success",
    fail_url: "http://localhost:3030/fail",
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: firstName,
    cus_email: email,
    cus_add1: address,
    cus_add2: address,
    cus_city: city,
    cus_state: "Dhaka",
    cus_postcode: postCode,
    cus_country: "Bangladesh",
    cus_phone: phoneNumber,
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  await sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    // res.redirect(GatewayPageURL);
    console.log("Redirecting to: ", GatewayPageURL);
    const orderdata = new orderSchema({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      city,
      postCode,
      products,
      totalPrice,
    });
    orderdata.save();
    return res.status(200).json({
      success: true,
      message: "Order complete ",
      data: orderdata,
      gatewayPageURL: GatewayPageURL,
    });
  });
}
module.exports = orderController;
