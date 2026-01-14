const express = require('express');
const router = express.Router();
const Order = require('../../models/Order.model');
const Coupon = require('../../models/Coupon.model');
const { verifyToken } = require('../../middleware/auth.middleware');

// @route   POST /api/orders
// @desc    Create new order
// @access  Private
router.post('/', verifyToken, async (req, res) => {
  try {
    const { items, shippingAddress, subtotal, couponCode } = req.body;
    
    let total = subtotal;
    let couponData = null;
    
    // Apply coupon if provided
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
      
      if (coupon) {
        const validation = coupon.isValid(subtotal);
        
        if (validation.valid) {
          const discount = coupon.calculateDiscount(subtotal);
          total = subtotal - discount;
          
          // Increment usage count
          coupon.usedCount += 1;
          await coupon.save();
          
          couponData = {
            code: coupon.code,
            discountAmount: discount,
          };
        }
      }
    }
    
    const order = new Order({
      userId: req.user.uid,
      userEmail: req.user.email,
      items,
      shippingAddress,
      subtotal,
      coupon: couponData,
      total,
    });
    
    await order.save();
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/orders/user
// @desc    Get user orders
// @access  Private
router.get('/user', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.uid })
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

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.productId', 'name category');
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    
    // Check if order belongs to user
    if (order.userId !== req.user.uid) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
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

module.exports = router;
