import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import staffService from './staffService';

const initialState = {
  staffList: [], // Note: Iska naam 'users' ya 'staffList' ho sakta hai, consistent rakhein
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// --- THUNKS ---

// 1. Get All Staff
export const getStaff = createAsyncThunk('staff/getAll', async (_, thunkAPI) => {
  try {
    // ✅ SAFETY CHECK: Pehle dekho user exist karta ha ya nahi
    const user = thunkAPI.getState().auth.user;
    
    if (!user || !user.token) {
        return thunkAPI.rejectWithValue("User not logged in (No Token)");
    }

    // Agar user hai, to token bhej do
    return await staffService.getStaff(user.token);

  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// 2. Create Staff
export const createStaff = createAsyncThunk('staff/create', async (staffData, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    
    if (!user || !user.token) {
        return thunkAPI.rejectWithValue("User not logged in");
    }

    return await staffService.createStaff(staffData, user.token);

  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// 3. Delete Staff
export const deleteStaff = createAsyncThunk('staff/delete', async (id, thunkAPI) => {
  try {
    const user = thunkAPI.getState().auth.user;
    
    if (!user || !user.token) {
        return thunkAPI.rejectWithValue("User not logged in");
    }

    await staffService.deleteStaff(id, user.token);
    return id; // ID wapis bhej rahe hain taake list se remove kar sakein

  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// --- SLICE ---
export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Staff Cases
      .addCase(getStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.staffList = action.payload; // Data set kar dia
      })
      .addCase(getStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create Staff Cases
      .addCase(createStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.staffList.push(action.payload);
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Staff Cases
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        // Jo ID delete hui, usay list se filter out kar do
        state.staffList = state.staffList.filter(
          (staff) => staff._id !== action.payload
        );
      });
  },
});

export const { reset } = staffSlice.actions;
export default staffSlice.reducer;