import { useState, useEffect } from "react";
import { getAllProducts } from "../api/services/product-service";
import Product from "../api/models/Product";
import ProductCard from "../components/ProductCard";

export default function Products(): JSX.Element {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const fetchProducts = () => {
    getAllProducts()
      .then((fetchedProducts) => {
        setAllProducts(fetchedProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <ProductCard key={product.id} product={product}  onPurchaseSuccess={fetchProducts} type="buy"/>
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
}
