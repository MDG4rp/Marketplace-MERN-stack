const express = require("express");
const router = express.Router();
const {
  getProducts,
  getUserProducts,
  addProduct,
  userAddsProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products.controller");

// Get all products 
router.get("/products", getProducts);

// Get all products for a specific user
router.get("/:id/products", getUserProducts);

// Admin creates a new product
router.post("/products", addProduct);

// User adds a product to their own list
router.post("/products/addProduct", userAddsProduct);

// Admin updates a product
router.put("/updateProduct/:id", updateProduct);

// Admin deletes a specific product from the market
router.delete("/products/:id", deleteProduct);

module.exports = router;