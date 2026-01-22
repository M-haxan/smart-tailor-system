import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../api'; // Humari api.js file
import toast from 'react-hot-toast'; // Errors dikhane k liye

// 1. Thunks (Backend Callers)
export const login = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await api.loginUser(formData);
    toast.success('Welcome Back!');
    return data; // Ye data 'action.payload' ban jayega
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    toast.error(message);
    return rejectWithValue(message);
  }
});

export const register = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
  try {
    const { data } = await api.registerUser(formData);
    toast.success('Account Created! Please Login.');
    return data;
  } catch (error) {
    const message = error.response?.data?.message || 'Registration failed';
    toast.error(message);
    return rejectWithValue(message);
  }
});

// 2. Initial State
const userFromStorage = localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo')) 
  : null;

const initialState = {
  user: userFromStorage,
  isLoading: false,
  isError: false,
  message: '',
};

// 3. Slice (Reducer Logic)
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('userInfo');
      state.user = null;
    },
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Login Cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload)); // Browser me save
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Register Cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        // Register k baad hum chahte hain user khud login kare, isliye user set nahi kiya
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { logout, reset } = authSlice.actions;
export default authSlice.reducer;