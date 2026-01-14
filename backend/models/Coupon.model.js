const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'flat'],
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0,
  },
  minOrderValue: {
    type: Number,
    default: 0,
    min: 0,
  },
  maxDiscountAmount: {
    type: Number,
    default: null,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  usageLimit: {
    type: Number,
    default: null,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, {
  timestamps: true,
});

// Validate coupon
couponSchema.methods.isValid = function(orderTotal) {
  const now = new Date();
  
  // Check if coupon is active
  if (this.status !== 'Active') {
    return { valid: false, message: 'Coupon is inactive' };
  }
  
  // Check expiry
  if (this.expiryDate < now) {
    return { valid: false, message: 'Coupon has expired' };
  }
  
  // Check usage limit
  if (this.usageLimit && this.usedCount >= this.usageLimit) {
    return { valid: false, message: 'Coupon usage limit reached' };
  }
  
  // Check minimum order value
  if (orderTotal < this.minOrderValue) {
    return { valid: false, message: `Minimum order value of $${this.minOrderValue} required` };
  }
  
  return { valid: true };
};

// Calculate discount
couponSchema.methods.calculateDiscount = function(orderTotal) {
  let discount = 0;
  
  if (this.discountType === 'percentage') {
    discount = (orderTotal * this.discountValue) / 100;
    
    // Apply max discount if set
    if (this.maxDiscountAmount && discount > this.maxDiscountAmount) {
      discount = this.maxDiscountAmount;
    }
  } else {
    discount = this.discountValue;
  }
  
  // Ensure discount doesn't exceed order total
  return Math.min(discount, orderTotal);
};

module.exports = mongoose.model('Coupon', couponSchema);
