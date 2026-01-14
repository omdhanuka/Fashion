const express = require('express');
const router = express.Router();
const Product = require('../models/Product.model');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const cloudinary = require('../config/cloudinary.config');
const streamifier = require('streamifier');

// Helper function to upload to Cloudinary
const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: 'fashion-ecommerce/products' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

// @route   GET /api/admin/products
// @desc    Get all products
// @access  Admin
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const products = await Product.find().populate('category', 'name').sort({ createdAt: -1 });
    
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

// @route   GET /api/admin/products/:id
// @desc    Get single product
// @access  Admin
router.get('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    
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

// @route   POST /api/admin/products
// @desc    Create product
// @access  Admin
router.post('/', verifyToken, verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description, stockQuantity, status } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Product image is required',
      });
    }
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer);
    
    const product = new Product({
      name,
      price,
      category,
      description,
      stockQuantity,
      status,
      imageUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
    });
    
    await product.save();
    await product.populate('category', 'name');
    
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PUT /api/admin/products/:id
// @desc    Update product
// @access  Admin
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), async (req, res) => {
  try {
    const { name, price, category, description, stockQuantity, status } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    
    // Update fields
    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;
    product.description = description || product.description;
    product.stockQuantity = stockQuantity !== undefined ? stockQuantity : product.stockQuantity;
    product.status = status || product.status;
    
    // Update image if new one provided
    if (req.file) {
      // Delete old image from Cloudinary
      if (product.cloudinaryPublicId) {
        await cloudinary.uploader.destroy(product.cloudinaryPublicId);
      }
      
      // Upload new image
      const result = await uploadToCloudinary(req.file.buffer);
      product.imageUrl = result.secure_url;
      product.cloudinaryPublicId = result.public_id;
    }
    
    await product.save();
    await product.populate('category', 'name');
    
    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   DELETE /api/admin/products/:id
// @desc    Delete product
// @access  Admin
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    
    // Delete image from Cloudinary
    if (product.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(product.cloudinaryPublicId);
    }
    
    await Product.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
