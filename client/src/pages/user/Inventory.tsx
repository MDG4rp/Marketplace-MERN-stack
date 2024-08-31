import { useState, useEffect, useCallback } from "react";
import {
  getUserProducts,
  getSearchedUserProducts,
} from "@/api/services/product-service";
import Product from "@/api/models/Product";
import ProductCard from "@/components/ProductCard";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Auth from "@/api/models/Auth";
import { useToastProvider } from "@/api/context/ToastContext";
import { ToastType } from "@/api/models/ToastContext";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@/components/ui/button";

export default function Products(): JSX.Element {
  const { showMessage } = useToastProvider();
  const auth = useAuthUser<Auth>();
  const userID = auth?.id;
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage: number = 4;

  const fetchProducts = useCallback(() => {
    if (!userID) return;

    const fetchFunction = searchTerm
      ? getSearchedUserProducts
      : getUserProducts;

    fetchFunction({
      userId: userID,
      search: searchTerm,
      page: currentPage,
      limit: itemsPerPage,
    })
      .then((response) => {
        console.log("Products fetched:", response.products.length);
        setUserProducts(response.products);
        setTotalPages(response.totalPages);
      })
      .catch(() => {
        showMessage({
          message: "Error fetching products",
          type: ToastType.ERROR,
        });
      });
  }, [searchTerm, currentPage, userID, showMessage, itemsPerPage]);

  const debouncedFetchProducts = useDebouncedCallback(fetchProducts, 1000);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      debouncedFetchProducts();
    },
    [debouncedFetchProducts]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
      debouncedFetchProducts();
    },
    [debouncedFetchProducts, totalPages]
  );

  if (!userID) {
    return <p className="text-red-600">User not authenticated.</p>;
  }

  return (
    <div className="min-h-full mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold dark:text-gray-100">
          Your Products
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
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
            className="dark:bg-transparent h-full w-full outline-none text-sm text-gray-700 dark:text-gray-100 pr-2"
            aria-label="Search products"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userProducts.length > 0 ? (
          userProducts.map((product, index) => (
            <ProductCard
              key={product.id || index}
              product={product}
              onPurchaseSuccess={fetchProducts}
              type="show"
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
