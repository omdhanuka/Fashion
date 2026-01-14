import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import shopReducer from "./features/shop/shopSlice";
import authReducer from "./features/auth/authSlice";
import adminReducer from "./features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    shop: shopReducer,
    auth: authReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Firebase user object in Redux
        ignoredActions: ['admin/setUser'],
        ignoredPaths: ['admin.user'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
