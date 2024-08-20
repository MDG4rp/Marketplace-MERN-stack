import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import Product from "./api/models/Product";
import {
  getAllProducts,
  getUserProducts,
  addProductToUser,
} from "./api/services/product-service";
import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { useNavigate } from "react-router-dom";

export default function Products(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const signOut = useSignOut();
  const navigate = useNavigate();


  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((response) => {
        setAllProducts(response);
        console.log(response);
        if (id) {
          return getUserProducts(id);
        } else {
          return [];
        }
      })
      .then((userProductsResponse) => {
        setUserProducts(userProductsResponse);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddProduct = (product: Product) => {
    if (id) {
      const quantity = quantities[product.id?product.id:1]; // Default to 1 if no quantity is set
      addProductToUser({
        userId: id,
        name: product.name,
        price: product.price,
        quantity,
      })
        .then(() => {
          return getUserProducts(id);
        })
        .then((updatedUserProducts) => {
          setUserProducts(updatedUserProducts);
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleLogOut = () => {
    signOut();
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        <button
          onClick={handleLogOut}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition mb-6"
        >
          Logout
        </button>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
          All Products
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allProducts.length > 0 ? (
            allProducts.map((product1, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    {product1.name}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">
                    Price: ${product1.price}
                  </p>
                  <input
                    type="number"
                    value={quantities[product1.id?product1.id:""]}
                    onChange={(e) =>
                      handleQuantityChange(product1.id?product1.id:"", Number(e.target.value))
                    }
                    className="border p-2 mb-4"
                    min="1"
                  />
                  <button
                    onClick={() => handleAddProduct(product1)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                  >
                    Add to My Products
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No products available.
            </p>
          )}
        </div>
        {userProducts.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Your Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h2>
                    <p className="text-lg text-gray-600 mb-4">
                      Price: ${product.price}
                    </p>
                    <p className="text-lg text-gray-600 mb-4">
                      Quantity: {product.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}