const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getDashboardStats,
  getChartData,
  getInventoryStatus,
  getLowStockAlerts,
  getRecentActivities
} = require('../controllers/dashboardController');

// All routes require authentication
router.use(auth);

router.get('/stats', getDashboardStats);
router.get('/chart-data', getChartData);
router.get('/inventory-status', getInventoryStatus);
router.get('/low-stock-alerts', getLowStockAlerts);
router.get('/recent-activities', getRecentActivities);

module.exports = router;
