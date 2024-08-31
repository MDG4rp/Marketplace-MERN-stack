import { useState, useEffect, useCallback } from "react";
import {
  getAllProducts,
  getSearchedProducts,
} from "@/api/services/product-service";
import Product from "@/api/models/Product";
import ProductCard from "@/components/ProductCard";
import { useDebouncedCallback } from "use-debounce";
import { useToastProvider } from "@/api/context/ToastContext";
import { ToastType } from "@/api/models/ToastContext";
import { Button } from "@/components/ui/button";

export default function Products(): JSX.Element {
  const { showMessage } = useToastProvider();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage: number = 4;

  const fetchProducts = useCallback(() => {
    const fetchFunction = searchTerm ? getSearchedProducts : getAllProducts;
    fetchFunction({
      search: searchTerm,
      page: currentPage,
      limit: itemsPerPage,
    })
      .then((response) => {
        setAllProducts(response.products);
        setTotalPages(response.totalPages);
      })
      .catch(() => {
        showMessage({
          message: "Error fetching products",
          type: ToastType.ERROR,
        });
      });
  }, [searchTerm, currentPage, showMessage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const debouncedFetchProducts = useDebouncedCallback(() => {
    fetchProducts();
  }, 1000);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      debouncedFetchProducts();
    },
    [debouncedFetchProducts]
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    debouncedFetchProducts();
  };

  return (
    <div className="min-h-full mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold dark:text-gray-100">
          Shop
        </h1>
        <div className="relative flex items-center w-full md:w-1/2 lg:w-1/3 h-12 mt-4 md:mt-0 rounded-lg bg-white dark:bg-transparent overflow-hidden border border-green-500 dark:border-neutral-700 hover:border-green-600 dark:hover:border-green-700 focus-within:ring-2 focus-within:ring-green-500">
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
            className="dark:bg-transparent h-full w-full outline-none text-sm text-gray-700 dark:text-gray-100 pr-2"
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
          <p className="text-gray-600 dark:text-gray-400 col-span-full">
            No products available.
          </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-center gap-4 items-center mt-6">
        <Button
          className="px-4 py-2 bg-green-500 dark:bg-green-700 dark:hover:bg-green-900 dark:text-white text-white rounded-lg enabled:hover:bg-green-700 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-lg">
          {totalPages != 0 ? `${currentPage} / ${totalPages}` : "/"}
        </span>
        <Button
          className="px-4 py-2 bg-green-500 dark:bg-green-700 dark:hover:bg-green-900 dark:text-white text-white rounded-lg enabled:hover:bg-green-700 disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
