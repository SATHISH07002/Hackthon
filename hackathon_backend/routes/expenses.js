const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { validateExpense, validateObjectId } = require('../middleware/validation');
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  approveExpense,
  getExpenseStats
} = require('../controllers/expenseController');

// All routes require authentication
router.use(auth);

// Expense management routes (staff and above)
router.use(authorize('staff', 'manager', 'admin'));

router.get('/', getExpenses);
router.get('/stats', getExpenseStats);
router.get('/:id', validateObjectId('id'), getExpense);
router.post('/', validateExpense, createExpense);
router.put('/:id', validateObjectId('id'), updateExpense);
router.delete('/:id', validateObjectId('id'), deleteExpense);

// Approval routes (manager and admin only)
router.use(authorize('manager', 'admin'));
router.patch('/:id/approve', validateObjectId('id'), approveExpense);

module.exports = router;
