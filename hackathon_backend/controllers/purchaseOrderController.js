const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/Product');

// Get all purchase orders with filtering and pagination
const getPurchaseOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      supplier,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (search) {
      filter.$or = [
        { poNumber: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status) {
      filter.status = status;
    }
    
    if (supplier) {
      filter.supplier = supplier;
    }
    
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const purchaseOrders = await PurchaseOrder.find(filter)
      .populate('supplier', 'name contact phone')
      .populate('items.product', 'name sku price')
      .populate('createdBy', 'firstName lastName')
      .populate('approvedBy', 'firstName lastName')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await PurchaseOrder.countDocuments(filter);

    res.json({
      success: true,
      data: purchaseOrders,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total: total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch purchase orders',
      error: error.message
    });
  }
};

// Get single purchase order
const getPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id)
      .populate('supplier', 'name contact phone address')
      .populate('items.product', 'name sku price category')
      .populate('createdBy', 'firstName lastName')
      .populate('approvedBy', 'firstName lastName');

    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found'
      });
    }

    res.json({
      success: true,
      data: purchaseOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch purchase order',
      error: error.message
    });
  }
};

// Create new purchase order
const createPurchaseOrder = async (req, res) => {
  try {
    const { items, supplier, expectedDelivery, notes } = req.body;

    // Validate products and calculate totals
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with ID ${item.product} not found`
        });
      }

      const itemTotal = item.unitCost * item.quantity;
      subtotal += itemTotal;

      validatedItems.push({
        product: product._id,
        quantity: item.quantity,
        unitCost: item.unitCost,
        total: itemTotal
      });
    }

    const tax = req.body.tax || 0;
    const shipping = req.body.shipping || 0;
    const total = subtotal + tax + shipping;

    const purchaseOrder = new PurchaseOrder({
      supplier,
      items: validatedItems,
      subtotal,
      tax,
      shipping,
      total,
      expectedDelivery,
      notes,
      createdBy: req.user._id
    });

    await purchaseOrder.save();

    await purchaseOrder.populate('supplier', 'name contact phone');
    await purchaseOrder.populate('items.product', 'name sku price');
    await purchaseOrder.populate('createdBy', 'firstName lastName');

    res.status(201).json({
      success: true,
      message: 'Purchase order created successfully',
      data: purchaseOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create purchase order',
      error: error.message
    });
  }
};

// Update purchase order
const updatePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    .populate('supplier', 'name contact phone')
    .populate('items.product', 'name sku price')
    .populate('createdBy', 'firstName lastName')
    .populate('approvedBy', 'firstName lastName');

    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found'
      });
    }

    res.json({
      success: true,
      message: 'Purchase order updated successfully',
      data: purchaseOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update purchase order',
      error: error.message
    });
  }
};

// Approve purchase order
const approvePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(
      req.params.id,
      {
        status: 'confirmed',
        approvedBy: req.user._id,
        approvedAt: new Date()
      },
      { new: true }
    )
    .populate('supplier', 'name contact phone')
    .populate('items.product', 'name sku price')
    .populate('createdBy', 'firstName lastName')
    .populate('approvedBy', 'firstName lastName');

    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found'
      });
    }

    res.json({
      success: true,
      message: 'Purchase order approved successfully',
      data: purchaseOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to approve purchase order',
      error: error.message
    });
  }
};

// Receive purchase order
const receivePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findById(req.params.id);
    
    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found'
      });
    }

    if (purchaseOrder.status !== 'confirmed' && purchaseOrder.status !== 'shipped') {
      return res.status(400).json({
        success: false,
        message: 'Purchase order must be confirmed or shipped to be received'
      });
    }

    // Update product stock
    for (const item of purchaseOrder.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } }
      );
    }

    purchaseOrder.status = 'received';
    purchaseOrder.actualDelivery = new Date();
    await purchaseOrder.save();

    await purchaseOrder.populate('supplier', 'name contact phone');
    await purchaseOrder.populate('items.product', 'name sku price');
    await purchaseOrder.populate('createdBy', 'firstName lastName');
    await purchaseOrder.populate('approvedBy', 'firstName lastName');

    res.json({
      success: true,
      message: 'Purchase order received successfully',
      data: purchaseOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to receive purchase order',
      error: error.message
    });
  }
};

// Delete purchase order
const deletePurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);

    if (!purchaseOrder) {
      return res.status(404).json({
        success: false,
        message: 'Purchase order not found'
      });
    }

    res.json({
      success: true,
      message: 'Purchase order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete purchase order',
      error: error.message
    });
  }
};

module.exports = {
  getPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder,
  updatePurchaseOrder,
  approvePurchaseOrder,
  receivePurchaseOrder,
  deletePurchaseOrder
};
