const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Active', 'Out of Stock'],
    default: 'Active',
  },
  imageUrl: {
    type: String,
    required: true,
  },
  cloudinaryPublicId: {
    type: String,
  },
}, {
  timestamps: true,
});

// Auto-update status based on stock quantity
productSchema.pre('save', function(next) {
  if (this.stockQuantity === 0) {
    this.status = 'Out of Stock';
  } else if (this.status === 'Out of Stock' && this.stockQuantity > 0) {
    this.status = 'Active';
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
