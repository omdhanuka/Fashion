# Fashion eCommerce Shop with Admin Dashboard

Complete full-stack eCommerce application with React.js frontend and Node.js/Express backend, featuring a comprehensive admin dashboard for managing products, categories, coupons, orders, and users.

## 🎯 Features

### Customer Features
- Browse and search products
- Filter products by category
- View product details
- Add items to cart
- Apply discount coupons at checkout
- Place orders
- User authentication (Firebase)
- Order history
- User profile management

### Admin Features
- **🔐 Admin Authentication** - Secure login with Firebase
- **📊 Dashboard** - View statistics (products, orders, users, coupons, revenue)
- **🛍️ Product Management** - CRUD operations with Cloudinary image upload
- **🗂️ Category Management** - Create and manage product categories
- **🎟️ Coupon Management** - Create discount coupons (percentage/flat, expiry, usage limits)
- **📦 Order Management** - View orders, update status, see coupon applications
- **👤 User Management** - View users, block/unblock functionality
- **⚙️ Settings** - Admin profile and password management

## 🧩 Tech Stack

### Frontend
- **React.js** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Firebase** - Authentication
- **React Hot Toast** - Notifications
- **React Icons** - Icons
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Firebase Admin SDK** - Authentication
- **Cloudinary** - Image storage
- **Multer** - File upload
- **CORS** - Cross-origin requests

## 📁 Project Structure

```
Fashion-eCommerce-Shop/
├── backend/                    # Backend API
│   ├── config/                # Configuration files
│   │   ├── firebase.config.js
│   │   └── cloudinary.config.js
│   ├── middleware/            # Middleware
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   ├── models/                # Database models
│   │   ├── Product.model.js
│   │   ├── Category.model.js
│   │   ├── Coupon.model.js
│   │   ├── Order.model.js
│   │   └── User.model.js
│   ├── routes/                # API routes
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   ├── category.routes.js
│   │   ├── coupon.routes.js
│   │   ├── order.routes.js
│   │   ├── user.routes.js
│   │   ├── dashboard.routes.js
│   │   └── public/            # Public routes
│   ├── server.js              # Entry point
│   └── package.json
│
├── src/                       # Frontend source
│   ├── components/            # React components
│   │   ├── admin/            # Admin components
│   │   │   ├── ProductFormModal.tsx
│   │   │   ├── CategoryFormModal.tsx
│   │   │   ├── CouponFormModal.tsx
│   │   │   └── OrderDetailsModal.tsx
│   │   ├── AdminLayout.tsx
│   │   └── AdminProtectedRoute.tsx
│   ├── config/               # Configuration
│   │   └── firebase.config.ts
│   ├── features/             # Redux slices
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── cart/
│   │   └── shop/
│   ├── pages/                # Page components
│   │   ├── admin/           # Admin pages
│   │   │   ├── AdminLogin.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── AdminProducts.tsx
│   │   │   ├── AdminCategories.tsx
│   │   │   ├── AdminCoupons.tsx
│   │   │   ├── AdminOrders.tsx
│   │   │   └── AdminUsers.tsx
│   │   └── ...              # Customer pages
│   ├── utils/               # Utilities
│   │   └── api.ts           # Axios instance
│   ├── App.tsx              # Main app with routes
│   └── main.tsx             # Entry point
│
├── .env.example              # Environment variables template
└── README.md                # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Firebase account
- Cloudinary account
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Fashion-eCommerce-Shop-in-React-main
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend directory:

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

**Firebase Setup:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create project → Project Settings → Service Accounts
3. Generate new private key (JSON)
4. Copy values to `.env`

**Cloudinary Setup:**
1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up → Dashboard
3. Copy Cloud Name, API Key, API Secret to `.env`

**MongoDB Setup:**
- **Local:** Install MongoDB and run `mongod`
- **Atlas:** Get connection string from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

Start backend server:

```bash
npm run dev  # Development with auto-reload
# or
npm start    # Production
```

Server runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ..  # Back to root directory
npm install
```

Create `.env` file in root directory:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id

VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_EMAILS=admin@example.com
```

**Firebase Web Config:**
1. Firebase Console → Project Settings → General
2. Scroll to "Your apps" → Web app
3. Copy config values to `.env`

Start frontend development server:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` (or shown port)

## 🎨 Usage

### Customer Side

1. **Browse Products:** Navigate to shop page
2. **Search & Filter:** Use search and category filters
3. **Add to Cart:** Click product → Add to cart
4. **Apply Coupon:** At checkout, enter coupon code
5. **Place Order:** Complete checkout form
6. **View Orders:** Login → Order History

### Admin Side

1. **Login:** Go to `/admin/login`
   - Use admin email configured in `.env`
   - Firebase email/password

2. **Dashboard:** View statistics and recent orders

3. **Manage Products:**
   - Add new products with images
   - Edit product details
   - Update stock and status
   - Delete products

4. **Manage Categories:**
   - Create categories
   - Edit category details
   - Activate/deactivate

5. **Manage Coupons:**
   - Create discount coupons
   - Set expiry dates
   - Configure usage limits
   - Enable/disable coupons

6. **Manage Orders:**
   - View all orders
   - Update order status
   - View order details with applied coupons

7. **Manage Users:**
   - View all registered users
   - Block/unblock users

## 🔐 Admin Access

To set up admin access:

1. **Backend:** Add admin email to `ADMIN_EMAIL` in `backend/.env`
   ```env
   ADMIN_EMAIL=admin@example.com,admin2@example.com
   ```

2. **Frontend:** Add same email(s) to `VITE_ADMIN_EMAILS` in `.env`
   ```env
   VITE_ADMIN_EMAILS=admin@example.com,admin2@example.com
   ```

3. **Firebase:** Create user account with admin email
   - Firebase Console → Authentication → Add User
   - Or register through app UI

4. **Login:** Navigate to `/admin/login` and sign in

## 📡 API Endpoints

### Admin Routes (Protected)
```
POST   /api/auth/sync-user              - Sync Firebase user

GET    /api/admin/dashboard/stats       - Dashboard statistics

GET    /api/admin/products              - Get all products
POST   /api/admin/products              - Create product
PUT    /api/admin/products/:id          - Update product
DELETE /api/admin/products/:id          - Delete product

GET    /api/admin/categories            - Get all categories
POST   /api/admin/categories            - Create category
PUT    /api/admin/categories/:id        - Update category
DELETE /api/admin/categories/:id        - Delete category

GET    /api/admin/coupons               - Get all coupons
POST   /api/admin/coupons               - Create coupon
PUT    /api/admin/coupons/:id           - Update coupon
PATCH  /api/admin/coupons/:id/toggle    - Toggle coupon status
DELETE /api/admin/coupons/:id           - Delete coupon

GET    /api/admin/orders                - Get all orders
GET    /api/admin/orders/:id            - Get order details
PATCH  /api/admin/orders/:id/status     - Update order status

GET    /api/admin/users                 - Get all users
PATCH  /api/admin/users/:id/block       - Block/unblock user
```

### Public Routes
```
GET    /api/products                    - Get active products
GET    /api/products/:id                - Get product details

GET    /api/categories                  - Get active categories

POST   /api/orders                      - Create order (with coupon)
GET    /api/orders/user                 - Get user orders
GET    /api/orders/:id                  - Get order details

POST   /api/coupons/validate            - Validate coupon code
```

## 🎟️ Coupon System

### Creating Coupons

Coupons support:
- **Discount Type:** Percentage (%) or Flat amount ($)
- **Minimum Order Value:** Required order total
- **Maximum Discount:** Cap on percentage discounts
- **Expiry Date:** Automatic expiration
- **Usage Limit:** Max number of uses
- **Status:** Active/Inactive toggle

### Coupon Validation

During checkout:
1. User enters coupon code
2. System validates:
   - Coupon exists
   - Status is Active
   - Not expired
   - Usage limit not reached
   - Order meets minimum value
3. Discount applied to order
4. Usage count incremented

### Example Coupons

```javascript
// 20% off, max $50 discount
{
  code: "SAVE20",
  discountType: "percentage",
  discountValue: 20,
  maxDiscountAmount: 50,
  minOrderValue: 100
}

// $10 flat discount
{
  code: "FLAT10",
  discountType: "flat",
  discountValue: 10,
  minOrderValue: 50
}
```

## 🛠️ Development

### Backend Development

```bash
cd backend
npm run dev  # Auto-reload with nodemon
```

### Frontend Development

```bash
npm run dev  # Vite dev server with HMR
```

### Build for Production

**Frontend:**
```bash
npm run build
npm run preview  # Preview production build
```

**Backend:**
Set `NODE_ENV=production` and deploy to hosting service

## 🔧 Configuration

### CORS Configuration

Update `backend/server.js` for production:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true
}));
```

### API Base URL

Update `.env` for production:

```env
VITE_API_URL=https://your-api-domain.com/api
```

## 📝 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `FIREBASE_PROJECT_ID` - Firebase project ID
- `FIREBASE_PRIVATE_KEY` - Firebase private key
- `FIREBASE_CLIENT_EMAIL` - Firebase client email
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `ADMIN_EMAIL` - Admin email addresses (comma-separated)

### Frontend (.env)
- `VITE_FIREBASE_API_KEY` - Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID
- `VITE_API_URL` - Backend API URL
- `VITE_ADMIN_EMAILS` - Admin email addresses (comma-separated)

## 📦 Deployment

### Backend (Node.js)
- **Heroku, Railway, Render, DigitalOcean**
- Set environment variables
- Ensure MongoDB connection

### Frontend (React)
- **Vercel, Netlify, AWS Amplify**
- Build: `npm run build`
- Deploy `dist` folder

## 🐛 Troubleshooting

### Firebase Auth Issues
- Verify credentials in Firebase Console
- Check `.env` variables match Firebase config
- Ensure admin email is registered in Firebase

### Cloudinary Upload Fails
- Verify API credentials
- Check file size limit (5MB max)
- Ensure supported file types (jpg, png, gif, webp)

### MongoDB Connection Error
- Check MongoDB is running (local)
- Verify connection string (Atlas)
- Check network access rules (Atlas)

### CORS Errors
- Update CORS origin in `backend/server.js`
- Ensure API URL matches in frontend `.env`

## 📄 License

ISC

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

## 👨‍💻 Author

GitHub: [Kuzma02](https://github.com/Kuzma02)

---

**Note:** Remember to secure your environment variables and never commit them to version control!
