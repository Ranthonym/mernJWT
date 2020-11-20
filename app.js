const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const userRouter = require("./routes/User");

app.use(cookieParser());
app.use(express.json());

const connectionString =
  "mongodb+srv://flexuser:flexhelper@cluster0.pfldj.mongodb.net/clientDB?retryWrites=true&w=majority";

// connect to mongoDB
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

app.use("./user", userRouter);

app.listen(5000, () => {
  console.log("express server started");
});
