# ✅ Admin Dashboard - Installation Checklist

Use this checklist to ensure your admin dashboard is properly configured.

## 📋 Pre-Installation

- [ ] Node.js v16+ installed
- [ ] MongoDB installed or MongoDB Atlas account ready
- [ ] Firebase project created
- [ ] Cloudinary account created
- [ ] Git repository cloned

## 🔧 Backend Configuration

### Dependencies
- [ ] Ran `cd backend && npm install`
- [ ] All packages installed without errors

### Environment Variables (backend/.env)
- [ ] File created from `.env.example`
- [ ] `PORT=5000` set
- [ ] `MONGODB_URI` configured
- [ ] `FIREBASE_PROJECT_ID` added
- [ ] `FIREBASE_PRIVATE_KEY` added (with proper formatting)
- [ ] `FIREBASE_CLIENT_EMAIL` added
- [ ] `CLOUDINARY_CLOUD_NAME` added
- [ ] `CLOUDINARY_API_KEY` added
- [ ] `CLOUDINARY_API_SECRET` added
- [ ] `ADMIN_EMAIL` configured with your admin email
- [ ] No syntax errors in `.env` file

### Database
- [ ] MongoDB running locally OR
- [ ] MongoDB Atlas connection string configured
- [ ] Can connect to database

### Firebase Admin
- [ ] Service account JSON downloaded from Firebase
- [ ] Credentials copied to backend `.env`
- [ ] Private key properly formatted (includes `\n`)

### Backend Server
- [ ] Server starts with `npm run dev`
- [ ] No errors in console
- [ ] Server running on http://localhost:5000
- [ ] Test endpoint: `GET http://localhost:5000/api/products` responds

## 🎨 Frontend Configuration

### Dependencies
- [ ] Ran `npm install` in root directory
- [ ] All packages installed without errors
- [ ] `firebase` package installed
- [ ] `react-firebase-hooks` package installed

### Environment Variables (.env in root)
- [ ] File created from `.env.example`
- [ ] All 6 Firebase config variables added:
  - [ ] `VITE_FIREBASE_API_KEY`
  - [ ] `VITE_FIREBASE_AUTH_DOMAIN`
  - [ ] `VITE_FIREBASE_PROJECT_ID`
  - [ ] `VITE_FIREBASE_STORAGE_BUCKET`
  - [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - [ ] `VITE_FIREBASE_APP_ID`
- [ ] `VITE_API_URL=http://localhost:5000/api` set
- [ ] `VITE_ADMIN_EMAILS` matches backend `ADMIN_EMAIL`
- [ ] No syntax errors in `.env` file

### Firebase Web Config
- [ ] Firebase Authentication enabled
- [ ] Email/Password provider enabled
- [ ] Web app registered in Firebase project
- [ ] Config values copied to frontend `.env`

### Frontend Server
- [ ] Server starts with `npm run dev`
- [ ] No errors in console
- [ ] App opens in browser
- [ ] Can navigate to pages

## 👤 Admin Account Setup

### Firebase Authentication
- [ ] Admin user created in Firebase Console OR
- [ ] Registered through app with admin email
- [ ] Admin email matches in both `.env` files
- [ ] Can sign in with admin credentials

### Admin Access
- [ ] Navigate to `/admin/login`
- [ ] Login with admin credentials
- [ ] Redirected to `/admin/dashboard` after login
- [ ] Dashboard loads without errors
- [ ] Can see statistics cards

## 🎯 Feature Testing

### Admin Dashboard
- [ ] Dashboard displays correctly
- [ ] Statistics show (may be 0 initially)
- [ ] Recent orders section visible
- [ ] No console errors

### Categories Management
- [ ] Can navigate to Categories page
- [ ] Can create new category
- [ ] Category appears in list
- [ ] Can edit category
- [ ] Can delete category

### Products Management
- [ ] Can navigate to Products page
- [ ] Can open "Add Product" modal
- [ ] Category dropdown populated
- [ ] Can upload image
- [ ] Image preview works
- [ ] Can create product
- [ ] Product appears with image
- [ ] Can edit product
- [ ] Can delete product

### Coupons Management
- [ ] Can navigate to Coupons page
- [ ] Can create new coupon
- [ ] Coupon code is uppercase
- [ ] Can set expiry date
- [ ] Can toggle coupon status
- [ ] Can edit coupon
- [ ] Can delete coupon

### Orders Management
- [ ] Can navigate to Orders page
- [ ] Orders list displays (may be empty)
- [ ] Can change order status
- [ ] Can view order details
- [ ] Order details modal shows all info
- [ ] Coupon info displayed if applied

### Users Management
- [ ] Can navigate to Users page
- [ ] Users list displays
- [ ] Can see admin users
- [ ] Can block/unblock users (not admins)
- [ ] User status updates correctly

### Navigation
- [ ] All sidebar links work
- [ ] Active page highlighted
- [ ] Can logout
- [ ] Redirected to login after logout

## 🔐 Security Verification

### Authentication
- [ ] Cannot access admin pages without login
- [ ] Non-admin users cannot access admin panel
- [ ] Protected routes working
- [ ] Token refresh works

### Authorization
- [ ] Admin endpoints require authentication
- [ ] Regular users cannot access admin APIs
- [ ] CORS configured correctly

## 🌐 API Testing

### Admin Endpoints (use Postman or similar)
- [ ] `GET /api/admin/dashboard/stats` (with auth token)
- [ ] `GET /api/admin/products` (with auth token)
- [ ] `GET /api/admin/categories` (with auth token)
- [ ] `GET /api/admin/coupons` (with auth token)
- [ ] `GET /api/admin/orders` (with auth token)
- [ ] `GET /api/admin/users` (with auth token)

### Public Endpoints (no auth needed)
- [ ] `GET /api/products`
- [ ] `GET /api/categories`
- [ ] `POST /api/coupons/validate`

## 🖼️ Cloudinary Integration

### Image Upload
- [ ] Can upload product image
- [ ] Image appears in Cloudinary dashboard
- [ ] Image URL saved in database
- [ ] Image displays in product list
- [ ] Can update product image
- [ ] Old image deleted from Cloudinary

## 💳 Coupon System

### Coupon Creation
- [ ] Can create percentage coupon
- [ ] Can create flat amount coupon
- [ ] Can set minimum order value
- [ ] Can set maximum discount
- [ ] Can set expiry date
- [ ] Can set usage limit
- [ ] Validation works

### Coupon Usage (from customer side)
- [ ] Can enter coupon at checkout
- [ ] Valid coupon applies discount
- [ ] Invalid coupon shows error
- [ ] Expired coupon rejected
- [ ] Usage count increments
- [ ] Order shows coupon info

## 📊 Data Verification

### Database
- [ ] Products collection exists
- [ ] Categories collection exists
- [ ] Coupons collection exists
- [ ] Orders collection exists
- [ ] Users collection exists
- [ ] Data persists after server restart

### Dashboard Statistics
- [ ] Product count accurate
- [ ] Order count accurate
- [ ] User count accurate
- [ ] Active coupon count accurate
- [ ] Total revenue calculates correctly

## 🐛 Common Issues - Troubleshooting

### Backend Won't Start
- [ ] Check MongoDB is running
- [ ] Verify `.env` file syntax
- [ ] Check for port conflicts
- [ ] Review error messages

### Frontend Won't Start
- [ ] Check all dependencies installed
- [ ] Verify `.env` file exists
- [ ] Clear node_modules and reinstall
- [ ] Check for syntax errors

### Cannot Login as Admin
- [ ] Verify admin email in both `.env` files
- [ ] Check Firebase user exists
- [ ] Ensure Authentication enabled in Firebase
- [ ] Try creating new admin user

### Images Won't Upload
- [ ] Verify Cloudinary credentials
- [ ] Check file size (< 5MB)
- [ ] Check file type (jpg, png, gif, webp)
- [ ] Review Cloudinary dashboard for errors

### CORS Errors
- [ ] Backend running on correct port
- [ ] Frontend API_URL matches backend
- [ ] CORS enabled in backend
- [ ] Try different browser

### Coupons Not Working
- [ ] Check coupon status is "Active"
- [ ] Verify expiry date is future
- [ ] Check order meets minimum value
- [ ] Ensure usage limit not reached

## ✨ Post-Installation

### Optional Enhancements
- [ ] Add more product categories
- [ ] Upload sample products
- [ ] Create promotional coupons
- [ ] Customize UI colors/branding
- [ ] Add more admin features

### Production Preparation
- [ ] Update CORS for production domain
- [ ] Configure MongoDB Atlas
- [ ] Set up environment variables on hosting
- [ ] Test on production environment
- [ ] Set up monitoring/logging

## 📝 Notes

**Important Files:**
- Backend config: `backend/.env`
- Frontend config: `.env` (root)
- Admin routes: `src/App.tsx`
- API calls: `src/utils/api.ts`

**Admin Panel URL:** `http://localhost:5173/admin/login`

**Default Credentials:** Use email from `ADMIN_EMAIL` in `.env`

**Support:** Check `QUICK_START.md` and `ADMIN_SETUP.md` for detailed guides

---

## ✅ Final Check

If you can do ALL of these, you're ready to go:
- [ ] Login to admin panel
- [ ] Create a category
- [ ] Add a product with image
- [ ] Create a coupon
- [ ] View dashboard statistics
- [ ] Navigate all admin pages
- [ ] Logout successfully

**Status:** _____ / 100% Complete

---

🎉 **Congratulations!** Your admin dashboard is fully configured!

Next: Start adding your products and managing your store!
