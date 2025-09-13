const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { validateStaff, validateObjectId } = require('../middleware/validation');
const {
  getStaff,
  getStaffMember,
  createStaff,
  updateStaff,
  deleteStaff,
  getDepartments,
  getStaffStats
} = require('../controllers/staffController');

// All routes require authentication
router.use(auth);

// Staff management routes (manager and admin only)
router.use(authorize('manager', 'admin'));

router.get('/', getStaff);
router.get('/departments', getDepartments);
router.get('/stats', getStaffStats);
router.get('/:id', validateObjectId('id'), getStaffMember);
router.post('/', validateStaff, createStaff);
router.put('/:id', validateObjectId('id'), updateStaff);
router.delete('/:id', validateObjectId('id'), deleteStaff);

module.exports = router;
