const express = require('express');
const router = express.Router();
const Order = require('../models/Order.model');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// @route   GET /api/admin/orders
// @desc    Get all orders
// @access  Admin
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('items.productId', 'name')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/admin/orders/:id
// @desc    Get single order
// @access  Admin
router.get('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.productId', 'name category');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    
    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PATCH /api/admin/orders/:id/status
// @desc    Update order status
// @access  Admin
router.patch('/:id/status', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }
    
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    
    order.status = status;
    await order.save();
    
    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
