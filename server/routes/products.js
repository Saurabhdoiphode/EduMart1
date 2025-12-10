const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Middleware to handle multer errors gracefully
const uploadErrorHandler = (err, req, res, next) => {
  if (err && err.name === 'MulterError') {
    console.warn('Multer error (non-fatal):', err.message);
    // Don't fail, just continue without images
    next();
  } else if (err) {
    console.warn('Upload error (non-fatal):', err.message);
    // Don't fail, just continue without images
    next();
  } else {
    next();
  }
};

router.get('/', getProducts);
router.get('/my-products', protect, getMyProducts);
router.get('/:id', getProduct);
router.post('/', protect, upload.array('images', 5), uploadErrorHandler, createProduct);
router.put('/:id', protect, upload.array('images', 5), uploadErrorHandler, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;

