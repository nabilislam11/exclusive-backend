require("dotenv").config();
const express = require("express");
const router = require("./routes");
const dbConnect = require("./config/dbConnect");
dbConnect();

const app = express();
const port = 3000;
const cors = require("cors");

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(cors());
app.use(router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
