const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { validateSale, validateObjectId } = require('../middleware/validation');
const {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
  getSalesStats
} = require('../controllers/saleController');

// All routes require authentication
router.use(auth);

// Sales management routes (staff and above)
router.use(authorize('staff', 'manager', 'admin'));

router.get('/', getSales);
router.get('/stats', getSalesStats);
router.get('/:id', validateObjectId('id'), getSale);
router.post('/', validateSale, createSale);
router.put('/:id', validateObjectId('id'), updateSale);
router.delete('/:id', validateObjectId('id'), deleteSale);

module.exports = router;
