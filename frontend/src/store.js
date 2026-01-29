import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import customerReducer from './features/customers/customerSlice'; // Import
import measurementReducer from './features/measurements/measurementSlice';
import staffReducer from './features/staff/staffSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customerReducer, // Add
    measurements: measurementReducer,
    staff: staffReducer,
  },
});