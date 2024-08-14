const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("All fields are required");
  }

  try {
    const user = await User.create({ name, email, password });
    res.send(user);
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).send("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email
      },
      "secret123"
    );
    res.json({ status: 200, jwt: token, name: user.name, id: user.id, mail: user.email });
  } else {
    res.json({ status: "error", message: "Invalid email or password" });
  }
});

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.sendStatus(403);

  jwt.verify(token, "secret123", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get("/dashboard", authenticateToken, (req, res) => {
  res.send("This is the protected dashboard. Welcome, " + req.user.name);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});