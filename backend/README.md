# Fashion eCommerce Backend API

Complete backend API for Fashion eCommerce with Admin Dashboard.

## Features

- 🔐 Firebase Authentication
- 👤 Admin-only Authorization
- 🛍️ Product Management with Cloudinary
- 🗂️ Category Management
- 🎟️ Coupon System with Validation
- 📦 Order Management
- 👥 User Management
- 📊 Dashboard Statistics

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Firebase Admin SDK** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File upload handling

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashion-ecommerce
NODE_ENV=development

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Admin Email (comma-separated for multiple admins)
ADMIN_EMAIL=admin@example.com
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Go to Project Settings > Service Accounts
4. Generate new private key (JSON file)
5. Copy the values to your `.env` file:
   - `project_id` → `FIREBASE_PROJECT_ID`
   - `private_key` → `FIREBASE_PRIVATE_KEY`
   - `client_email` → `FIREBASE_CLIENT_EMAIL`

### 4. Cloudinary Setup

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up or log in
3. Go to Dashboard
4. Copy credentials to `.env`:
   - Cloud Name → `CLOUDINARY_CLOUD_NAME`
   - API Key → `CLOUDINARY_API_KEY`
   - API Secret → `CLOUDINARY_API_SECRET`

### 5. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB locally and run:
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 6. Run the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/sync-user` - Sync Firebase user with database

### Admin - Products
- `GET /api/admin/products` - Get all products
- `GET /api/admin/products/:id` - Get single product
- `POST /api/admin/products` - Create product (with image upload)
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

### Admin - Categories
- `GET /api/admin/categories` - Get all categories
- `GET /api/admin/categories/:id` - Get single category
- `POST /api/admin/categories` - Create category
- `PUT /api/admin/categories/:id` - Update category
- `DELETE /api/admin/categories/:id` - Delete category

### Admin - Coupons
- `GET /api/admin/coupons` - Get all coupons
- `GET /api/admin/coupons/:id` - Get single coupon
- `POST /api/admin/coupons` - Create coupon
- `PUT /api/admin/coupons/:id` - Update coupon
- `PATCH /api/admin/coupons/:id/toggle-status` - Enable/disable coupon
- `DELETE /api/admin/coupons/:id` - Delete coupon

### Admin - Orders
- `GET /api/admin/orders` - Get all orders
- `GET /api/admin/orders/:id` - Get single order
- `PATCH /api/admin/orders/:id/status` - Update order status

### Admin - Users
- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users/:id/block` - Block/unblock user

### Admin - Dashboard
- `GET /api/admin/dashboard/stats` - Get dashboard statistics

### Public - Products
- `GET /api/products` - Get all active products
- `GET /api/products/:id` - Get single product

### Public - Categories
- `GET /api/categories` - Get all active categories

### Public - Orders
- `POST /api/orders` - Create order (with coupon support)
- `GET /api/orders/user` - Get user orders
- `GET /api/orders/:id` - Get single order

### Public - Coupons
- `POST /api/coupons/validate` - Validate coupon code

## Authentication

All admin routes require:
1. **Firebase Token** in header: `Authorization: Bearer <token>`
2. **Admin Email** matching `ADMIN_EMAIL` in `.env`

All user routes require:
1. **Firebase Token** in header: `Authorization: Bearer <token>`

## Image Upload

Product images are uploaded to Cloudinary with:
- Folder: `fashion-ecommerce/products`
- Max size: 5MB
- Formats: JPEG, JPG, PNG, GIF, WebP

Use `multipart/form-data` with field name `image`

## Coupon Validation Rules

1. **Status**: Must be Active
2. **Expiry**: Must not be expired
3. **Minimum Order**: Order total must meet minimum
4. **Usage Limit**: Must not exceed usage limit (if set)
5. **Discount Type**:
   - Percentage: 0-100%
   - Flat: Fixed amount

## Database Models

### Product
- name, price, category, description
- stockQuantity, status (Active/Out of Stock)
- imageUrl, cloudinaryPublicId

### Category
- name, slug, description
- imageUrl, isActive

### Coupon
- code (unique), discountType (percentage/flat)
- discountValue, minOrderValue
- maxDiscountAmount, expiryDate
- usageLimit, usedCount, status

### Order
- userId, userEmail, items[]
- shippingAddress, subtotal, coupon
- total, status, paymentMethod

### User
- firebaseUid, email, displayName
- photoURL, isBlocked, role

## Error Handling

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Security

- Firebase token verification on all protected routes
- Admin-only access for sensitive operations
- Input validation and sanitization
- CORS enabled for frontend integration

## Development

```bash
# Install nodemon for auto-reload
npm install -g nodemon

# Run in development mode
npm run dev
```

## Production Deployment

1. Set `NODE_ENV=production`
2. Use environment variables (not .env file)
3. Enable HTTPS
4. Set up MongoDB replica set
5. Configure proper CORS origins
6. Add rate limiting
7. Enable logging and monitoring

## License

ISC
