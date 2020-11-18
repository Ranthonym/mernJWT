const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const User = require("./models/User");

app.use(cookieParser());
app.use(express.json());

mongoose.connect(
  "mongodb://localhost:27017/mernauth",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("successfully connected to database");
  }
);
// const userInput = {
//   username: "jak",
//   password: "1234567",
//   role: "admin",
// };

// const user = new User(userInput);
// user.save((err, document) => {
//   if (err) console.log(err);
//   console.log(document);
// });

app.listen(5000, () => {
  console.log("express server started");
});
