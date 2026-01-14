const express = require('express');
const router = express.Router();
const Category = require('../models/Category.model');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// @route   GET /api/admin/categories
// @desc    Get all categories
// @access  Admin
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   GET /api/admin/categories/:id
// @desc    Get single category
// @access  Admin
router.get('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }
    
    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   POST /api/admin/categories
// @desc    Create category
// @access  Admin
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, imageUrl, isActive } = req.body;
    
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category already exists',
      });
    }
    
    const category = new Category({
      name,
      description,
      imageUrl,
      isActive,
    });
    
    await category.save();
    
    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/admin/categories/:id
// @desc    Update category
// @access  Admin
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, imageUrl, isActive } = req.body;
    
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }
    
    // Update fields
    category.name = name || category.name;
    category.description = description !== undefined ? description : category.description;
    category.imageUrl = imageUrl !== undefined ? imageUrl : category.imageUrl;
    category.isActive = isActive !== undefined ? isActive : category.isActive;
    
    await category.save();
    
    res.json({
      success: true,
      message: 'Category updated successfully',
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/admin/categories/:id
// @desc    Delete category
// @access  Admin
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }
    
    await Category.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
