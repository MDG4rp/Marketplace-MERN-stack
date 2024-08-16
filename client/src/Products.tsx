import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from './api/models/Product'; // Adjust path as necessary
import { getAllProducts, getUserProducts, addProductToUser } from './api/services/product-service'; // Adjust path as necessary

export default function ProductsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getAllProducts()
      .then((response) => {
        setAllProducts(response);
        console.log('All products:', response);
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
        console.error('Error fetching products:', error);
        setError('Error fetching products');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddProduct = (product: Product) => {
    if (id) {
      addProductToUser({
        userId: id,
        name: product.name,
        price: product.price,
        quantity: 1, // Set the quantity to 1 or prompt the user for quantity
      })
        .then(() => {
          return getUserProducts(id);
        })
        .then((updatedUserProducts) => {
          setUserProducts(updatedUserProducts);
        })
        .catch((error) => {
          console.error('Error adding product:', error);
          setError('Error adding product');
        });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="w-full max-w-5xl p-8 bg-gray-900 bg-opacity-70 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">All Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allProducts.length > 0 ? (
            allProducts.map((product) => (
              <div key={product.id} className="p-4 bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-indigo-300">Price: ${product.price}</p>
                <button
                  onClick={() => handleAddProduct(product)}
                  className="mt-4 px-4 py-2 bg-indigo-600 rounded hover:bg-indigo-700"
                >
                  Add to My Products
                </button>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>

        <h1 className="text-3xl font-bold mt-12 mb-6">Your Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userProducts.length > 0 ? (
            userProducts.map((product) => (
              <div key={product.id} className="p-4 bg-gray-800 rounded-lg">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-indigo-300">Price: ${product.price}</p>
              </div>
            ))
          ) : (
            <p>You have no products.</p>
          )}
        </div>
      </div>
    </div>
  );
}