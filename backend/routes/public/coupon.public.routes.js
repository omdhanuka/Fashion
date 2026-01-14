const express = require('express');
const router = express.Router();
const Coupon = require('../../models/Coupon.model');

// @route   POST /api/coupons/validate
// @desc    Validate coupon code
// @access  Public
router.post('/validate', async (req, res) => {
  try {
    const { code, orderTotal } = req.body;
    
    if (!code || !orderTotal) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code and order total are required',
      });
    }
    
    const coupon = await Coupon.findOne({ code: code.toUpperCase() });
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Invalid coupon code',
      });
    }
    
    const validation = coupon.isValid(orderTotal);
    
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }
    
    const discount = coupon.calculateDiscount(orderTotal);
    
    res.json({
      success: true,
      message: 'Coupon is valid',
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discount,
        newTotal: orderTotal - discount,
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
