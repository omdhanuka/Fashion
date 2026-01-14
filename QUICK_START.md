# 🚀 Quick Start Guide - Admin Dashboard Setup

## Prerequisites Checklist
- [ ] Node.js installed (v16+)
- [ ] MongoDB installed (or Atlas account)
- [ ] Firebase account created
- [ ] Cloudinary account created

## 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ..
npm install
```

### Step 2: Configure Firebase (1 minute)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project
3. Enable Authentication → Email/Password
4. Project Settings → Service Accounts → Generate new private key
5. Download JSON file

### Step 3: Configure Cloudinary (30 seconds)

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up (free tier works)
3. Dashboard → Copy credentials

### Step 4: Setup Environment Variables (1 minute)

**Backend `.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fashion-ecommerce

# From Firebase JSON file
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com

# From Cloudinary dashboard
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-secret

# Your admin email
ADMIN_EMAIL=admin@example.com
```

**Frontend `.env`:**
```env
# From Firebase → Project Settings → General → Your apps → Web app
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef

VITE_API_URL=http://localhost:5000/api
VITE_ADMIN_EMAILS=admin@example.com
```

### Step 5: Start the Application (30 seconds)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## First Time Admin Setup

### Create Admin Account

**Option 1: Firebase Console**
1. Firebase Console → Authentication → Users → Add User
2. Email: `admin@example.com` (match your `.env`)
3. Password: Create strong password
4. Click "Add user"

**Option 2: Register through App**
1. Open app → Register page
2. Sign up with admin email
3. User becomes admin automatically

### Access Admin Panel

1. Navigate to `http://localhost:5173/admin/login`
2. Login with admin credentials
3. You'll be redirected to dashboard

## Test the System

### 1. Create a Category
- Admin Panel → Categories → Add Category
- Name: "Women's Clothing"
- Click Create

### 2. Add a Product
- Admin Panel → Products → Add Product
- Fill in details
- Upload image
- Select category
- Click Create

### 3. Create a Coupon
- Admin Panel → Coupons → Add Coupon
- Code: `WELCOME10`
- Type: Percentage
- Value: 10
- Expiry: Future date
- Click Create

### 4. Test Customer Flow
- Open new browser window
- Browse products
- Add to cart
- Go to checkout
- Apply coupon `WELCOME10`
- Place order

### 5. Manage Order
- Back to Admin Panel → Orders
- View order details
- Update status to "Confirmed"

## Common Setup Issues

### MongoDB Connection Failed
```bash
# Start MongoDB locally
mongod

# Or use MongoDB Atlas
# Get connection string from Atlas dashboard
# Update MONGODB_URI in backend/.env
```

### Firebase Auth Error
- Double-check all Firebase credentials
- Ensure private key includes `\n` for line breaks
- Wrap private key in quotes in `.env`

### Cloudinary Upload Error
- Verify credentials are correct
- Check internet connection
- Ensure file size < 5MB

### Admin Access Denied
- Verify email matches in both `.env` files
- Check admin user exists in Firebase Auth
- Try logging out and back in

### CORS Error
- Ensure backend is running
- Check `VITE_API_URL` matches backend port
- Clear browser cache

## Next Steps

✅ **System is Running!**

Now you can:
1. ✏️ Customize the UI colors and branding
2. 📦 Add more products and categories
3. 🎟️ Create marketing coupons
4. 📊 Monitor orders and users
5. 🚀 Deploy to production

## Production Deployment Quick Tips

### Backend (Heroku/Railway/Render)
- Set all environment variables
- Use MongoDB Atlas for database
- Update CORS to allow your frontend domain

### Frontend (Vercel/Netlify)
- Build: `npm run build`
- Set environment variables
- Update `VITE_API_URL` to production backend

## Support

### Documentation
- Full setup: See `ADMIN_SETUP.md`
- Backend API: See `backend/README.md`
- Frontend guide: See original `README.md`

### Help
- Check environment variables are correct
- Ensure all services are running
- Review console for errors
- Restart servers if needed

---

🎉 **Congratulations!** Your admin dashboard is ready!

Access admin panel: `http://localhost:5173/admin/login`
