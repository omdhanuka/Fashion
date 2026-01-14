const admin = require('../config/firebase.config');

// Verify Firebase token
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

// Verify admin role
const verifyAdmin = async (req, res, next) => {
  try {
    const adminEmails = process.env.ADMIN_EMAIL?.split(',') || [];
    
    if (!adminEmails.includes(req.user.email)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin only.',
      });
    }

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Access denied',
    });
  }
};

module.exports = { verifyToken, verifyAdmin };
