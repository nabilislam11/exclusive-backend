const mongoose = require("mongoose");
function dbConnect() {
  mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Database Connected");
  });
}
module.exports = dbConnect;
