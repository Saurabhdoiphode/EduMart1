import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './MyProducts.css';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const res = await axios.get('/api/products/my-products');
      setProducts(res.data.data);
    } catch (error) {
      toast.error('Error fetching your products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await axios.delete(`/api/products/${productId}`);
      toast.success('Product deleted successfully');
      fetchMyProducts();
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  if (loading) {
    return <div className="loading">Loading your products...</div>;
  }

  return (
    <div className="my-products">
      <div className="container">
        <div className="my-products-header">
          <h1>My Products</h1>
          <Link to="/sell-product" className="add-product-btn">
            Add New Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <p>You haven't listed any products yet.</p>
            <Link to="/sell-product" className="cta-btn">
              List Your First Product
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={`http://localhost:5000/${product.images[0]}`}
                      alt={product.name}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="product-category">{product.category}</p>
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-condition">Condition: {product.condition}</p>
                  <p className="product-status">Status: {product.status}</p>
                  <p className="product-available">
                    Available: {product.available ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className="product-actions">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;