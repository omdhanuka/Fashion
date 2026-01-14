const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon.model');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// @route   GET /api/admin/coupons
// @desc    Get all coupons
// @access  Admin
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/admin/coupons/:id
// @desc    Get single coupon
// @access  Admin
router.get('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }
    
    res.json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/admin/coupons
// @desc    Create coupon
// @access  Admin
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minOrderValue,
      maxDiscountAmount,
      expiryDate,
      usageLimit,
      status,
    } = req.body;
    
    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
    if (existingCoupon) {
      return res.status(400).json({
        success: false,
        message: 'Coupon code already exists',
      });
    }
    
    // Validate percentage discount
    if (discountType === 'percentage' && discountValue > 100) {
      return res.status(400).json({
        success: false,
        message: 'Percentage discount cannot exceed 100%',
      });
    }
    
    const coupon = new Coupon({
      code: code.toUpperCase(),
      discountType,
      discountValue,
      minOrderValue,
      maxDiscountAmount,
      expiryDate,
      usageLimit,
      status,
    });
    
    await coupon.save();
    
    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/admin/coupons/:id
// @desc    Update coupon
// @access  Admin
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const {
      code,
      discountType,
      discountValue,
      minOrderValue,
      maxDiscountAmount,
      expiryDate,
      usageLimit,
      status,
    } = req.body;
    
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }
    
    // Check if new code already exists (if code is being changed)
    if (code && code.toUpperCase() !== coupon.code) {
      const existingCoupon = await Coupon.findOne({ code: code.toUpperCase() });
      if (existingCoupon) {
        return res.status(400).json({
          success: false,
          message: 'Coupon code already exists',
        });
      }
      coupon.code = code.toUpperCase();
    }
    
    // Validate percentage discount
    if (discountType === 'percentage' && discountValue > 100) {
      return res.status(400).json({
        success: false,
        message: 'Percentage discount cannot exceed 100%',
      });
    }
    
    // Update fields
    if (discountType) coupon.discountType = discountType;
    if (discountValue !== undefined) coupon.discountValue = discountValue;
    if (minOrderValue !== undefined) coupon.minOrderValue = minOrderValue;
    if (maxDiscountAmount !== undefined) coupon.maxDiscountAmount = maxDiscountAmount;
    if (expiryDate) coupon.expiryDate = expiryDate;
    if (usageLimit !== undefined) coupon.usageLimit = usageLimit;
    if (status) coupon.status = status;
    
    await coupon.save();
    
    res.json({
      success: true,
      message: 'Coupon updated successfully',
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PATCH /api/admin/coupons/:id/toggle-status
// @desc    Enable/disable coupon
// @access  Admin
router.patch('/:id/toggle-status', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }
    
    coupon.status = coupon.status === 'Active' ? 'Inactive' : 'Active';
    await coupon.save();
    
    res.json({
      success: true,
      message: `Coupon ${coupon.status === 'Active' ? 'enabled' : 'disabled'} successfully`,
      data: coupon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/admin/coupons/:id
// @desc    Delete coupon
// @access  Admin
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: 'Coupon not found',
      });
    }
    
    await Coupon.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Coupon deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
