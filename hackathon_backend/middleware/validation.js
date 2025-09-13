const { body, param, query, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// User validation rules
const validateUser = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('firstName')
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must be less than 50 characters')
    .trim(),
  body('lastName')
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must be less than 50 characters')
    .trim(),
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'staff'])
    .withMessage('Role must be admin, manager, or staff'),
  handleValidationErrors
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Product validation rules
const validateProduct = [
  body('sku')
    .isLength({ min: 1, max: 50 })
    .withMessage('SKU is required and must be less than 50 characters')
    .matches(/^[A-Z0-9-_]+$/)
    .withMessage('SKU can only contain uppercase letters, numbers, hyphens, and underscores'),
  body('name')
    .isLength({ min: 1, max: 200 })
    .withMessage('Product name is required and must be less than 200 characters')
    .trim(),
  body('category')
    .isIn(['Sports', 'Groceries', 'Dairy Products', 'Stationary', 'Electronics', 'Other'])
    .withMessage('Invalid category'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('stock')
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('minStock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Minimum stock must be a non-negative integer'),
  handleValidationErrors
];

// Staff validation rules
const validateStaff = [
  body('name')
    .isLength({ min: 1, max: 100 })
    .withMessage('Name is required and must be less than 100 characters')
    .trim(),
  body('position')
    .isLength({ min: 1, max: 100 })
    .withMessage('Position is required and must be less than 100 characters')
    .trim(),
  body('department')
    .isIn(['Management', 'Sales', 'Inventory', 'Finance', 'HR', 'Operations', 'Staff'])
    .withMessage('Invalid department'),
  body('salary')
    .isFloat({ min: 0 })
    .withMessage('Salary must be a positive number'),
  body('address')
    .isLength({ min: 1, max: 500 })
    .withMessage('Address is required and must be less than 500 characters')
    .trim(),
  body('joinDate')
    .isISO8601()
    .withMessage('Join date must be a valid date'),
  body('experience')
    .isLength({ min: 1, max: 50 })
    .withMessage('Experience is required and must be less than 50 characters')
    .trim(),
  body('contact')
    .matches(/^[\+]?[0-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  handleValidationErrors
];

// Supplier validation rules
const validateSupplier = [
  body('name')
    .isLength({ min: 1, max: 200 })
    .withMessage('Supplier name is required and must be less than 200 characters')
    .trim(),
  body('contact')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('phone')
    .matches(/^[\+]?[0-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  handleValidationErrors
];

// Sale validation rules
const validateSale = [
  body('customer.name')
    .isLength({ min: 1, max: 100 })
    .withMessage('Customer name is required and must be less than 100 characters')
    .trim(),
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('items.*.product')
    .isMongoId()
    .withMessage('Invalid product ID'),
  body('items.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be at least 1'),
  body('items.*.unitPrice')
    .isFloat({ min: 0 })
    .withMessage('Unit price must be a positive number'),
  body('paymentMethod')
    .isIn(['cash', 'card', 'upi', 'bank_transfer', 'cheque', 'other'])
    .withMessage('Invalid payment method'),
  body('channel')
    .isIn(['POS', 'Online', 'Phone', 'Walk-in', 'Other'])
    .withMessage('Invalid channel'),
  handleValidationErrors
];

// Expense validation rules
const validateExpense = [
  body('category')
    .isIn(['Rent', 'Utilities', 'Logistics', 'Marketing', 'Office Supplies', 'Maintenance', 'Insurance', 'Other'])
    .withMessage('Invalid expense category'),
  body('description')
    .isLength({ min: 1, max: 500 })
    .withMessage('Description is required and must be less than 500 characters')
    .trim(),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('paymentMethod')
    .isIn(['cash', 'card', 'bank_transfer', 'cheque', 'upi', 'other'])
    .withMessage('Invalid payment method'),
  handleValidationErrors
];

// Common validation for MongoDB ObjectId
const validateObjectId = (paramName) => [
  param(paramName)
    .isMongoId()
    .withMessage(`Invalid ${paramName} ID`),
  handleValidationErrors
];

module.exports = {
  handleValidationErrors,
  validateUser,
  validateLogin,
  validateProduct,
  validateStaff,
  validateSupplier,
  validateSale,
  validateExpense,
  validateObjectId
};
