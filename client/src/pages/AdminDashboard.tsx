import { useState, useEffect } from "react";
import { getAllProducts, deleteProduct } from "@/api/services/product-service";
import Product from "@/api/models/Product";
import ProductTable from "@/components/ProductsTable";
import { Button } from "@/components/ui/button";
import { AddProductDialog } from "@/components/AddProductDialog";

export default function AdminDashboard(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  useEffect(() => {
    fetchProducts(searchQuery);
  }, [page, searchQuery]);

  const fetchProducts = async (query?: string) => {
    try {
      const response = await getAllProducts({
        search: query,
        page: page,
        limit: 5,
      });
      setProducts(response.products);
      setTotalPages(response.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleOpenAddDialog = (product?: Product) => {
    setSelectedProduct(product);
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

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleProductChange = (query?: string) => {
    setSearchQuery(query || "");
    fetchProducts(query);
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-900 dark:text-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-7 mx-8 rounded-lg h-screen">
      <div className="p-8 rounded-lg shadow-2xl bg-white dark:bg-transparent border dark:border-neutral-700">
        <ProductTable
          onProductChange={handleProductChange}
          products={products}
          onDeleteProduct={handleDeleteProduct}
        />
        <div className="flex justify-between items-center mt-4 ml-3">
          <AddProductDialog
            product={selectedProduct}
            handleOpenAddDialog={() => handleOpenAddDialog()}
            onProducttChange={handleProductChange}
          />
          <div className="flex-1 flex justify-center mr-[10rem]">
            <div className="flex gap-6">
              <Button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="dark:bg-green-700 text-white hover:bg-green-700 bg-green-500 dark:text-white dark:hover:bg-green-900"
              >
                Previous
              </Button>
              <span className="self-center">
                {totalPages != 0 ? `${page} / ${totalPages}` : "/"}
              </span>
              <Button
                onClick={handleNextPage}
                disabled={page === totalPages || totalPages === 0}
                className="dark:bg-green-700 dark:text-white hover:bg-green-700 bg-green-500 text-white dark:hover:bg-green-900"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
