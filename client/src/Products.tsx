import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from './api/models/Product'; // Adjust path as necessary
import { getAllProducts, getUserProducts } from './api/services/product-service'; // Adjust path as necessary

export default function ProductsPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [userProducts, setUserProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      getAllProducts()
        .then((response) => {
          setAllProducts(response);
        })
        .catch((error) => {
          console.error('Error fetching all products:', error);
        });
      getUserProducts(id ? id : '')
        .then((res) => {
          setUserProducts(res);
        })
        .catch((error) => {
          console.error('Error fetching user-specific products:', error);
        })
        .finally(() => {
          setLoading(false);
        });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
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