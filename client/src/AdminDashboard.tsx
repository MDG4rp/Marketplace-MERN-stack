import { useState, useEffect } from "react";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
} from "./api/services/product-service";
import Product from "./api/models/Product";
import AddProductForm from "./components/AddProductForm";
import { SubmitHandler } from "react-hook-form";

export default function AdminDashboard(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllProducts()
      .then((response) => {
        setProducts(response.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleAddProduct: SubmitHandler<Product> = ({
    name,
    price,
    quantity,
  }: Product) => {
    addProduct({ name, price, quantity })
      .then((newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
        console.log("Product added:", newProduct);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        console.log("Product deleted:", productId);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AddProductForm onSubmit={handleAddProduct} />
      {/* Renderizza la lista dei prodotti */}
    </>
  );
}
