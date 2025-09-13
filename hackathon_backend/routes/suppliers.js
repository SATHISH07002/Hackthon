const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { validateSupplier, validateObjectId } = require('../middleware/validation');
const {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
  getSupplierStats
} = require('../controllers/supplierController');

// All routes require authentication
router.use(auth);

// Supplier management routes (staff and above)
router.use(authorize('staff', 'manager', 'admin'));

router.get('/', getSuppliers);
router.get('/stats', getSupplierStats);
router.get('/:id', validateObjectId('id'), getSupplier);
router.post('/', validateSupplier, createSupplier);
router.put('/:id', validateObjectId('id'), updateSupplier);
router.delete('/:id', validateObjectId('id'), deleteSupplier);

module.exports = router;
