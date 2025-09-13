const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { validateObjectId } = require('../middleware/validation');
const {
  getPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder,
  updatePurchaseOrder,
  approvePurchaseOrder,
  receivePurchaseOrder,
  deletePurchaseOrder
} = require('../controllers/purchaseOrderController');

// All routes require authentication
router.use(auth);

// Purchase order management routes (staff and above)
router.use(authorize('staff', 'manager', 'admin'));

router.get('/', getPurchaseOrders);
router.get('/:id', validateObjectId('id'), getPurchaseOrder);
router.post('/', createPurchaseOrder);
router.put('/:id', validateObjectId('id'), updatePurchaseOrder);
router.delete('/:id', validateObjectId('id'), deletePurchaseOrder);

// Approval and receiving routes (manager and admin only)
router.use(authorize('manager', 'admin'));
router.patch('/:id/approve', validateObjectId('id'), approvePurchaseOrder);
router.patch('/:id/receive', validateObjectId('id'), receivePurchaseOrder);

module.exports = router;
