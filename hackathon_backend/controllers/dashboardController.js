const Product = require('../models/Product');
const Sale = require('../models/Sale');
const Expense = require('../models/Expense');
const Staff = require('../models/Staff');
const Supplier = require('../models/Supplier');
const PurchaseOrder = require('../models/PurchaseOrder');

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Get basic counts
    const [
      totalProducts,
      activeStaff,
      activeSuppliers,
      openPurchaseOrders,
      lowStockProducts
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Staff.countDocuments({ status: 'active' }),
      Supplier.countDocuments({ isActive: true }),
      PurchaseOrder.countDocuments({ status: { $in: ['draft', 'sent', 'confirmed', 'shipped'] } }),
      Product.countDocuments({ 
        isActive: true,
        $expr: { $lte: ['$stock', '$minStock'] }
      })
    ]);

    // Get sales data for current month
    const currentMonthSales = await Sale.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$total' },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    // Get sales data for last month
    const lastMonthSales = await Sale.aggregate([
      {
        $match: {
          createdAt: { 
            $gte: startOfLastMonth,
            $lte: endOfLastMonth
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$total' },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    // Get expenses for current month
    const currentMonthExpenses = await Expense.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth },
          status: { $in: ['approved', 'paid'] }
        }
      },
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: '$amount' }
        }
      }
    ]);

    // Calculate growth percentages
    const currentSales = currentMonthSales[0]?.totalSales || 0;
    const lastSales = lastMonthSales[0]?.totalSales || 0;
    const salesGrowth = lastSales > 0 ? ((currentSales - lastSales) / lastSales * 100) : 0;

    const currentOrders = currentMonthSales[0]?.totalOrders || 0;
    const lastOrders = lastMonthSales[0]?.totalOrders || 0;
    const ordersGrowth = lastOrders > 0 ? ((currentOrders - lastOrders) / lastOrders * 100) : 0;

    const currentExpenses = currentMonthExpenses[0]?.totalExpenses || 0;

    res.json({
      success: true,
      data: {
        kpis: [
          {
            name: 'Total Products',
            value: totalProducts.toString(),
            change: '+12%', // This could be calculated based on historical data
            changeType: 'positive',
            icon: 'CubeIcon'
          },
          {
            name: 'Low Stock Items',
            value: lowStockProducts.toString(),
            change: lowStockProducts > 0 ? 'Needs Attention' : 'All Good',
            changeType: lowStockProducts > 0 ? 'negative' : 'positive',
            icon: 'ExclamationTriangleIcon'
          },
          {
            name: 'Open POs',
            value: openPurchaseOrders.toString(),
            change: '+2',
            changeType: 'positive',
            icon: 'TruckIcon'
          },
          {
            name: 'Monthly Sales',
            value: `Rs ${currentSales.toLocaleString()}`,
            change: `${salesGrowth >= 0 ? '+' : ''}${salesGrowth.toFixed(1)}%`,
            changeType: salesGrowth >= 0 ? 'positive' : 'negative',
            icon: 'CurrencyRupeeIcon'
          }
        ],
        monthlyData: {
          sales: currentSales,
          expenses: currentExpenses,
          profit: currentSales - currentExpenses,
          orders: currentOrders
        },
        growth: {
          sales: salesGrowth,
          orders: ordersGrowth
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
      error: error.message
    });
  }
};

// Get sales and expenses chart data
const getChartData = async (req, res) => {
  try {
    const { months = 12 } = req.query;
    const now = new Date();
    const data = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const nextDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const [salesData, expensesData] = await Promise.all([
        Sale.aggregate([
          {
            $match: {
              createdAt: { $gte: date, $lt: nextDate }
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$total' }
            }
          }
        ]),
        Expense.aggregate([
          {
            $match: {
              createdAt: { $gte: date, $lt: nextDate },
              status: { $in: ['approved', 'paid'] }
            }
          },
          {
            $group: {
              _id: null,
              total: { $sum: '$amount' }
            }
          }
        ])
      ]);

      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      data.push({
        month: monthNames[date.getMonth()],
        sales: salesData[0]?.total || 0,
        expenses: expensesData[0]?.total || 0
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch chart data',
      error: error.message
    });
  }
};

// Get inventory status pie chart data
const getInventoryStatus = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ isActive: true });
    const lowStockProducts = await Product.countDocuments({ 
      isActive: true,
      $expr: { $lte: ['$stock', '$minStock'] }
    });
    const outOfStockProducts = await Product.countDocuments({ 
      isActive: true,
      stock: 0
    });

    const data = [
      {
        name: 'Products',
        value: totalProducts - lowStockProducts - outOfStockProducts,
        color: '#DAA520'
      },
      {
        name: 'Low Stock',
        value: lowStockProducts,
        color: '#FF6F61'
      },
      {
        name: 'Out of Stock',
        value: outOfStockProducts,
        color: '#FF4500'
      }
    ];

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch inventory status',
      error: error.message
    });
  }
};

// Get low stock alerts
const getLowStockAlerts = async (req, res) => {
  try {
    const products = await Product.find({
      isActive: true,
      $expr: { $lte: ['$stock', '$minStock'] }
    }).populate('supplier', 'name contact phone');

    const alerts = products.map(product => ({
      id: product._id,
      productId: product._id,
      productName: product.name,
      category: product.category,
      currentStock: product.stock,
      minStock: product.minStock,
      threshold: product.minStock,
      alertType: 'low_stock',
      timestamp: new Date().toISOString(),
      priority: product.stock === 0 ? 'critical' : 'warning',
      supplier: product.supplier
    }));

    res.json({
      success: true,
      data: alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch low stock alerts',
      error: error.message
    });
  }
};

// Get recent activities
const getRecentActivities = async (req, res) => {
  try {
    const [recentSales, recentExpenses, recentPurchaseOrders] = await Promise.all([
      Sale.find()
        .populate('processedBy', 'firstName lastName')
        .sort({ createdAt: -1 })
        .limit(5),
      Expense.find()
        .populate('approvedBy', 'firstName lastName')
        .sort({ createdAt: -1 })
        .limit(5),
      PurchaseOrder.find()
        .populate('supplier', 'name')
        .populate('createdBy', 'firstName lastName')
        .sort({ createdAt: -1 })
        .limit(5)
    ]);

    const activities = [
      ...recentSales.map(sale => ({
        type: 'sale',
        id: sale._id,
        description: `Sale ${sale.saleNumber} - Rs ${sale.total}`,
        user: sale.processedBy,
        timestamp: sale.createdAt
      })),
      ...recentExpenses.map(expense => ({
        type: 'expense',
        id: expense._id,
        description: `${expense.category} - Rs ${expense.amount}`,
        user: expense.approvedBy,
        timestamp: expense.createdAt
      })),
      ...recentPurchaseOrders.map(po => ({
        type: 'purchase_order',
        id: po._id,
        description: `PO ${po.poNumber} - ${po.supplier.name}`,
        user: po.createdBy,
        timestamp: po.createdAt
      }))
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);

    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch recent activities',
      error: error.message
    });
  }
};

module.exports = {
  getDashboardStats,
  getChartData,
  getInventoryStatus,
  getLowStockAlerts,
  getRecentActivities
};
