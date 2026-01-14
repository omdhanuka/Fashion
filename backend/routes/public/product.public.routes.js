const express = require('express');
const router = express.Router();
const Product = require('../../models/Product.model');

// @route   GET /api/products
// @desc    Get all active products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ status: 'Active' })
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name slug');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
