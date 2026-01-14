const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/admin/products', require('./routes/product.routes'));
app.use('/api/admin/categories', require('./routes/category.routes'));
app.use('/api/admin/coupons', require('./routes/coupon.routes'));
app.use('/api/admin/orders', require('./routes/order.routes'));
app.use('/api/admin/users', require('./routes/user.routes'));
app.use('/api/admin/dashboard', require('./routes/dashboard.routes'));

// Public routes (for frontend customers)
app.use('/api/products', require('./routes/public/product.public.routes'));
app.use('/api/categories', require('./routes/public/category.public.routes'));
app.use('/api/orders', require('./routes/public/order.public.routes'));
app.use('/api/coupons', require('./routes/public/coupon.public.routes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
