const mongoose = require("mongoose");
const ProductSchema = require("./product.model").ProductSchema;

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
  },
  name:{ 
    type: String
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
  products: [ProductSchema],
}, {
  collection: "user-data",
  timestamps: true,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;