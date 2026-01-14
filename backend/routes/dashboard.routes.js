const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');
const Order = require('../models/Order.model');
const User = require('../models/User.model');
const Coupon = require('../models/Coupon.model');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// @route   GET /api/admin/dashboard/stats
// @desc    Get dashboard statistics
// @access  Admin
router.get('/stats', verifyToken, verifyAdmin, async (req, res) => {
  try {
    // Get counts
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const activeCoupons = await Coupon.countDocuments({ status: 'Active' });
    
    // Get recent orders (last 10)
    const recentOrders = await Order.find()
      .populate('items.productId', 'name')
      .sort({ createdAt: -1 })
      .limit(10);
    
    // Calculate revenue
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$total' },
        },
      },
    ]);
    
    res.json({
      success: true,
      data: {
        stats: {
          totalProducts,
          totalOrders,
          totalUsers,
          activeCoupons,
          totalRevenue: totalRevenue[0]?.total || 0,
        },
        recentOrders,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
