const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Admin
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// @route   PATCH /api/admin/users/:id/block
// @desc    Block/unblock user
// @access  Admin
router.patch('/:id/block', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
    user.isBlocked = !user.isBlocked;
    await user.save();
    
    res.json({
      success: true,
      message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
