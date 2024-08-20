import { useState, useEffect } from "react";
import { getAllProducts, deleteProduct} from "./api/services/product-service";
import Product from "./api/models/Product";
import ProductTable from "@/components/ProductsTable"; // Ensure the import path is correct

export default function AdminDashboard(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      console.log("Product deleted:", productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-900 dark:text-gray-100">
        Loading...
      </div>
    );
  }
  function onProdutChange(){
    fetchProducts();
  }

  return (
    <div className="p-7 mx-8 rounded-lg bg-gray-200 dark:bg-gray-900">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
        <ProductTable
        onProductChange={onProdutChange}
          products={products}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
    </div>
  );
}