const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: String,
    price: Number,
    quantity: Number,
    imageUrl: String,
  }],
  shippingAddress: {
    fullName: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    phone: String,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  coupon: {
    code: String,
    discountAmount: Number,
  },
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paymentMethod: {
    type: String,
    default: 'Cash on Delivery',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
