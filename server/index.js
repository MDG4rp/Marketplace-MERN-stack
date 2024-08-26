const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const productRoute = require("./routes/product.route");
const authRoute = require("./routes/auth.route");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const mongodbUri = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;

// Configurazione CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

// Middleware section
app.use(cookieParser()); // Parsing dei cookie
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet()); // Sicurezza delle intestazioni HTTP

// Routes
app.use("/", productRoute);
app.use("/", authRoute);

// Connessione al database MongoDB
mongoose
  .connect(mongodbUri)
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Connection failed", err);
  });