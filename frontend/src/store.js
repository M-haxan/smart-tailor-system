import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import customerReducer from './features/customers/customerSlice'; // Import

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer, // Add
  },
});