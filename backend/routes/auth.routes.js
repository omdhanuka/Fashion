const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const admin = require('../config/firebase.config');

// @route   POST /api/auth/sync-user
// @desc    Sync Firebase user with database
// @access  Public (but requires Firebase token)
router.post('/sync-user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }
    
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Check if user exists in database
    let user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (!user) {
      // Create new user
      user = new User({
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name || '',
        photoURL: decodedToken.picture || '',
      });
      
      await user.save();
    }
    
    res.json({
      success: true,
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
