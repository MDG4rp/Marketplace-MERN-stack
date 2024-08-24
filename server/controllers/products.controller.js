const { Product } = require("../models/product.model");
const User = require("../models/user.model");
require("dotenv").config();

const api = process.env.API_URL;

const getProducts = async (req, res) => {

  try {
    // ricerca
    const { search } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};
    const products = await Product.find(query);
    res.status(200).json({
      products: products,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("products");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.products);
  } catch (error) {
    console.error("Error fetching user products:", error);
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    let product = await Product.findOne({ name: req.body.name });

    const quantityToAdd = Number(req.body.quantity);

    if (product) {
      product.quantity += quantityToAdd;
      await product.save();
      res.status(200).json(product);
    } else {
      product = new Product({
        name: req.body.name,
        quantity: quantityToAdd,
        price: req.body.price,
        image: req.body.image,
      });
      await product.save();
      res.status(201).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userAddsProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity, price, image } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const storeProduct = await Product.findOne({ name });
    if (!storeProduct) {
      return res.status(404).json({ message: "Product not found in store" });
    }

    if (storeProduct.quantity < quantity) {
      return res
        .status(400)
        .json({ message: "Not enough quantity available in store" });
    }

    storeProduct.quantity -= quantity;
    await storeProduct.save();

    const existingProduct = user.products.find(
      (product) => product.name === name
    );

    if (existingProduct) {
      existingProduct.quantity += Number(quantity);
    } else {
      user.products.push({
        name,
        quantity: Number(quantity),
        price,
        image,
      });
    }

    await user.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: req.body });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getUserProducts,
  getProduct,
  addProduct,
  userAddsProduct,
  updateProduct,
  deleteProduct,
};
