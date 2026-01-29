import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import staffService from './staffService';

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// --- Thunks ---
export const createStaff = createAsyncThunk('staff/create', async (data, thunkAPI) => {
  try { return await staffService.createStaff(data); }
  catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); }
});

export const getStaff = createAsyncThunk('staff/getAll', async (_, thunkAPI) => {
  try { return await staffService.getStaff(); }
  catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); }
});

export const deleteStaff = createAsyncThunk('staff/delete', async (id, thunkAPI) => {
  try { return await staffService.deleteStaff(id); }
  catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); }
});

// --- Slice ---
export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false; state.isSuccess = false; state.isLoading = false; state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStaff.pending, (state) => { state.isLoading = true; })
      .addCase(getStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users.push(action.payload); // List me add
        state.message = 'New Staff Member Added!';
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload.id);
      });
  },
});

export const { reset } = staffSlice.actions;
export default staffSlice.reducer;