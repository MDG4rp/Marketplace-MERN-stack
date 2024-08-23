import { useState, useEffect } from "react";
import { getUserProducts } from "../api/services/product-service";
import Product from "../api/models/Product";
import ProductCard from "../components/ProductCard";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Auth from "@/api/models/auth";

export default function Products(): JSX.Element {
  const auth = useAuthUser<Auth>();
  const userID = auth?.id;
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = () => {
    if (userID) {
      setLoading(true);
      getUserProducts(userID)
        .then((fetchedProducts) => {
          setUserProducts(fetchedProducts);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (userID) {
      fetchProducts();
    }
  }, [userID]);

  if (!userID) {
    return <p className="text-red-600">User not authenticated.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Products
      </h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {userProducts.length > 0 ? (
            userProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onPurchaseSuccess={fetchProducts}
                type="show"
              />
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No products available.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
