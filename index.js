require("dotenv").config();
const express = require("express");
const router = require("./routes");
const dbConnect = require("./config/dbConnect");
dbConnect();
const app = express();
const port = 3000;
app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
