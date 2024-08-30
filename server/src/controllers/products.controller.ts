import Product from "../models/product.model";
import { Request, Response } from "express";
import User from "../models/user.model";
import { UserDocument } from "../types/UserDocument";
import { ProductDocument } from "../types/ProductDocument";
import { UserAddsProductRequest } from "../types/UserAddsProductRequest";
import { UpdateProductRequest } from "../types/updateProductRequest";
import { UserRemovesProductRequest } from "../types/userRemovesProductRequest";

export async function getAllProducts(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { search, page = "1", limit = "10" } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    const query = search
      ? { name: { $regex: search as string, $options: "i" } }
      : {};

    const products = await Product.find(query).skip(skip).limit(pageSize);
    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / pageSize);

    res.status(200).json({
      products: products,
      currentPage: pageNumber,
      totalPages: totalPages,
      totalProducts: totalProducts,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function getUserProducts(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "User ID is required" });
    return;
  }

  try {
    const { search, page = "1", limit = "10" } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;
    const query = search ? new RegExp(search as string, "i") : null;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const filteredProducts = user.products.filter((product: any) => {
      return query ? query.test(product.name) : true;
    });
    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / pageSize);
    const paginatedProducts = filteredProducts.slice(skip, skip + pageSize);

    res.status(200).json({
      products: paginatedProducts,
      currentPage: pageNumber,
      totalPages: totalPages,
      totalProducts: totalProducts,
      message: "Products fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function addProduct(req: Request, res: Response): Promise<void> {
  const {
    name,
    quantity,
    price,
    image,
  }: { name: string; quantity: number; price: number; image: string } =
    req.body;

  try {
    let product: ProductDocument | null = await Product.findOne({ name });

    const quantityToAdd = Number(quantity);

    if (product) {
      product.quantity += quantityToAdd;
      await product.save();
      res.status(200).json(product);
    } else {
      product = new Product({
        name: name,
        price: price,
        image: image,
        quantity: quantityToAdd,
      }) as ProductDocument;
      await product.save();
      res.status(201).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function userAddsProduct(
  req: UserAddsProductRequest,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const { name, quantity, price, image } = req.body;

    const user: UserDocument | null = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const storeProduct: ProductDocument | null = await Product.findOne({
      name,
    });
    if (!storeProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (storeProduct.quantity < quantity) {
      res.status(400).json({ message: "Not enough products in stock" });
      return;
    }

    storeProduct.quantity -= quantity;
    await storeProduct.save();

    const existingProduct = user.products.find(
      (product) => product.name === name
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      user.products.push({
        name,
        quantity: Number(quantity),
        price,
        image,
      });
    }

    await user.save();
    res.status(200).json({ message: "Product added to the inventory" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function updateProduct(
  req: UpdateProductRequest,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product: ProductDocument | null = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function adminDeletesProduct(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    const product: ProductDocument | null = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export async function userRemovesProduct(
  req: UserRemovesProductRequest,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const user: UserDocument | null = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const product = user.products.find((product) => product.name === name);

    if (!product) {
      res
        .status(404)
        .json({ message: "Product not found in user's inventory" });
      return;
    }

    if (product.quantity < quantity) {
      res.status(400).json({ message: "Not enough products in stock" });
      return;
    }

    product.quantity -= quantity;

    if (product.quantity === 0) {
      user.products = user.products.filter((p) => p.name !== name);
    }

    await user.save();
    res.status(200).json({ message: "Product removed from the inventory" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}
