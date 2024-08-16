const express = require("express");
const router = express.Router();
const {
  getProducts,
  getUserProducts,
  getProduct,
  addProduct,
  userAddsProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { adminAuth} = require("../controllers/auth.controller");

// Get all products 
router.get("/products", getProducts);

// Get all products for a specific user
router.get("/users/:id/products", getUserProducts);

// Get a single product by product ID
router.get("/products/:productId", getProduct);

// Admin creates a new product
router.post("/products", adminAuth, addProduct);

// User adds a product to their own list
router.post("/users/:id/products/addProduct", userAddsProduct);

// Admin updates a specific product
router.put("/products/:productId", adminAuth, updateProduct);

// Admin deletes a specific product
router.delete("/products/:productId", adminAuth, deleteProduct);

module.exports = router;