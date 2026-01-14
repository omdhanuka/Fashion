import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import api from '../../utils/api';

interface AdminState {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  user: null,
  isAdmin: false,
  loading: true,
  error: null,
};

// Check if user is admin
export const checkAdminStatus = createAsyncThunk(
  'admin/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        return false;
      }

      // Sync user with backend
      const response = await api.post('/auth/sync-user');
      
      // Check if user has admin email
      const adminEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',') || [];
      const isAdmin = adminEmails.includes(user.email || '');
      
      return isAdmin;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to check admin status');
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.isAdmin = action.payload;
    },
    clearAdmin: (state) => {
      state.user = null;
      state.isAdmin = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAdminStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAdminStatus.fulfilled, (state, action) => {
        state.isAdmin = action.payload;
        state.loading = false;
      })
      .addCase(checkAdminStatus.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.isAdmin = false;
      });
  },
});

export const { setUser, setAdmin, clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;
