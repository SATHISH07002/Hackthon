const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { validateProduct, validateObjectId } = require('../middleware/validation');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  updateStock,
  getLowStockProducts,
  getCategories
} = require('../controllers/productController');

// All routes require authentication
router.use(auth);

// Public product routes (authenticated users)
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/low-stock', getLowStockProducts);
router.get('/:id', validateObjectId('id'), getProduct);

// Product management routes (staff and above)
router.use(authorize('staff', 'manager', 'admin'));

router.post('/', validateProduct, createProduct);
router.put('/:id', validateObjectId('id'), updateProduct);
router.delete('/:id', validateObjectId('id'), deleteProduct);
router.patch('/:id/stock', validateObjectId('id'), updateStock);

module.exports = router;
