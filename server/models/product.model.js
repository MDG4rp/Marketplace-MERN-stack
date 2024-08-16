const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, enter the product name"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false, // Optional field, no need to specify `required: false`
    },
  },
  {
    collection: "products", // Ensure consistent collection naming
    timestamps: true, // Optional: adds createdAt and updatedAt fields
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product, ProductSchema };