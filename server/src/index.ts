import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import helmet from "helmet";
import productRoute from "./routes/product.route";
import authRoute from "./routes/auth.route";

config();
const app = express();
const mongodbUri = process.env.MONGODB_URI || "";
const port = process.env.PORT || 3000;

// configurazione cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// sezione middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/", productRoute);
app.use("/", authRoute);

// connessione al database
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
