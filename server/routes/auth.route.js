const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getAllUsers,
  deleteUser,
} = require("../controllers/auth.controller");

// Route for user registration
router.post("/register", register);

// Route for user login
router.post("/login", login);

// Route to get all users
router.get("/userslist", getAllUsers);

/* // Route to delete a user
router.delete("/deleteUser/:id", deleteUser); 

// Route for user logout
router.post("/logout", logout); */

module.exports = router;