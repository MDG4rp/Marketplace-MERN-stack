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
      validate(value) {
        if (value < 0) throw new Error("Quantity cannot be negative");
      }
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product, ProductSchema };