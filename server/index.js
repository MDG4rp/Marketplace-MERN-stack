const express = require("express");
const mongoose = require("mongoose");
const productRoute = require("./routes/product.route");
const authRoute = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT;

// middleware section
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());

// routes
app.use("/", productRoute);
app.use("/", authRoute);

mongoose
  .connect(mongodbUri)
  .then(() => {
    console.log("Connected!");

    app.listen(port)
  })

  .catch(() => console.log("Connection failed"));
