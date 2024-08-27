import { useState, useEffect, useCallback } from "react";
import {
  getAllProducts,
  getSearchedProducts,
} from "../api/services/product-service";
import Product from "../api/models/Product";
import ProductCard from "../components/ProductCard";
import { useDebouncedCallback } from "use-debounce";

export default function Products(): JSX.Element {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

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

  const debouncedHandleSearch = useDebouncedCallback((value: string) => {
    getSearchedProducts({ search: value })
      .then((response) => {
        setAllProducts(response.products);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, 1000);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      debouncedHandleSearch(value);
    },
    [debouncedHandleSearch]
  );

  return (
    <div className="h-screen mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-gray-100">Shop</h1>
        <div className="relative flex items-center w-1/3 h-12 rounded-lg bg-white dark:bg-transparent overflow-hidden border border-green-500 dark:border-neutral-700 hover:border-green-600 dark:hover:border-green-700 focus-within:ring-2 focus-within:ring-green-500">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className=" dark:bg-transparent h-full w-full outline-none text-sm text-gray-700 dark:text-gray-100 pr-2"
            type="text"
            id="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            aria-label="Search products"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allProducts.length > 0 ? (
          allProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPurchaseSuccess={fetchProducts}
              type="buy"
            />
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