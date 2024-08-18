import { useState, useEffect } from "react";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
} from "./api/services/product-service";
import Product from "./api/models/Product";

export default function AdminDashboard(): JSX.Element {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    quantity: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllProducts().then((response) => {
      setProducts(response);
      setLoading(false);
    });
  }, []);


  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct(newProduct)
      .then((response) => {
        setProducts([...products, response.data]);
        setNewProduct({ id: "", name: "", price: 0, quantity: 0 });
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  const handleDeleteProduct = (productId: string) => {
    deleteProduct(productId)
      .then(() => {
        setProducts(products.filter((product) => product.id !== productId));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          Admin Dashboard
        </h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Manage Users
          </h2>
          
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Add Product
          </h2>
          <form onSubmit={handleAddProduct}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="productName"
              >
                Product Name
              </label>
              <input
                id="productName"
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="productPrice"
              >
                Price
              </label>
              <input
                id="productPrice"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                className="border p-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="productQuantity"
              >
                Quantity
              </label>
              <input
                id="productQuantity"
                type="number"
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: parseInt(e.target.value, 10),
                  })
                }
                className="border p-2 w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Add Product
            </button>
          </form>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Manage Products
          </h2>
          <ul className="list-disc pl-5">
            {products.length > 0 ? (
              products.map((product) => (
                <li key={product.id} className="mb-2 flex items-center">
                  <span className="mr-4">
                    {product.name} - ${product.price} - Quantity:{" "}
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
                  >
                    Delete Product
                  </button>
                </li>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
