import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import API_URL from '../../config/api';
import './MyWishlist.css';

const getImageUrl = (path) => {
  if (!path) return '';
  return path.startsWith('http') ? path : `${API_URL}/${path}`;
};

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get('/api/wishlist');
      setWishlist(res.data.data || []);
    } catch (error) {
      toast.error('Error fetching wishlist');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      await axios.delete(`/api/wishlist/${wishlistId}`);
      toast.success('Removed from wishlist');
      fetchWishlist();
    } catch (error) {
      toast.error('Error removing from wishlist');
    }
  };

  if (loading) {
    return <div className="loading">Loading your wishlist...</div>;
  }

  return (
    <div className="my-wishlist">
      <div className="container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>Products you've saved for later</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="no-products">
            <p>Your wishlist is empty.</p>
            <Link to="/products" className="cta-btn">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="products-grid">
            {wishlist.map((item) => (
              <div key={item._id} className="product-card">
                <div className="product-image">
                  {item.product && item.product.images && item.product.images.length > 0 ? (
                    <img
                      src={getImageUrl(item.product.images[0])}
                      alt={item.product.name}
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{item.product?.name}</h3>
                  <p className="product-category">{item.product?.category}</p>
                  <p className="product-price">₹{item.product?.price}</p>
                  <p className="product-condition">Condition: {item.product?.condition}</p>
                  <p className="product-status">Status: {item.product?.status}</p>
                  <div className="product-actions">
                    <Link
                      to={`/products/${item.product?._id}`}
                      className="view-btn"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleRemoveFromWishlist(item._id)}
                      className="delete-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;
