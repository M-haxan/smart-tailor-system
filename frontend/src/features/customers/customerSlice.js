import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerService from './customerService';

const initialState = {
  customers: [], // List yahan ayegi
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// --- THUNKS (Workers) ---

// --- THUNKS (Workers) ---

// 1. Create Customer
export const createCustomer = createAsyncThunk(
  'customers/create',
  async (customerData, thunkAPI) => {
    try {
      // ❌ Token nikalne ki zaroorat nahi
      return await customerService.createCustomer(customerData);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 2. Get Customers
export const getCustomers = createAsyncThunk(
  'customers/getAll',
  async (_, thunkAPI) => {
    try {
      return await customerService.getCustomers();
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// 3. Delete Customer
export const deleteCustomer = createAsyncThunk(
  'customers/delete',
  async (id, thunkAPI) => {
    try {
      return await customerService.deleteCustomer(id);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- SLICE (Manager) ---
export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    reset: (state) => initialState, // Sab saaf karne k liye
  },
  extraReducers: (builder) => {
    builder
      // Create Cases
      .addCase(createCustomer.pending, (state) => { state.isLoading = true; })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers.push(action.payload); // List me naya banda add
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Cases
      .addCase(getCustomers.pending, (state) => { state.isLoading = true; })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload; // Poori list update
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Cases
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // UI se us banday ko hata do jo delete hua (backend id return karega)
        state.customers = state.customers.filter((c) => c._id !== action.payload.id);
      });
  },
});

export const { reset } = customerSlice.actions;
export default customerSlice.reducer;