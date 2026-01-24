import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import measurementService from './measurementService';

const initialState = {
  templates: [], // Yahan "Suit", "Sherwani" waghaira ayenge
  measurements: [],
  activeMeasurement: null, // Edit karte waqt purana naap yahan ayega
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// --- THUNKS (Workers) ---

// 1. Create Template (Settings)
export const addTemplate = createAsyncThunk('measurements/addTemplate', async (data, thunkAPI) => {
  try { return await measurementService.addTemplate(data); }
  catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); }
});

// 2. Get Templates (Settings & Dropdown)
export const getTemplates = createAsyncThunk('measurements/getTemplates', async (_, thunkAPI) => {
  try { return await measurementService.getTemplates(); }
  catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); }
});

// 3. Save Measurement
export const saveMeasurement = createAsyncThunk('measurements/save', async (data, thunkAPI) => {
  try { return await measurementService.saveMeasurement(data); }
  catch (error) { return thunkAPI.rejectWithValue(error.response?.data?.message || error.message); }
});

// --- SLICE ---
export const measurementSlice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Template Cases ---
      .addCase(getTemplates.pending, (state) => { state.isLoading = true; })
      .addCase(getTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates = action.payload; // List save ho gayi
      })
      
      .addCase(addTemplate.pending, (state) => { state.isLoading = true; })
      .addCase(addTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.templates.push(action.payload); // Naya template list me add
        state.message = 'Template Created Successfully!';
      })
      .addCase(addTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // --- Measurement Cases ---
      .addCase(saveMeasurement.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Measurement Saved!';
      });
  },
});

export const { reset } = measurementSlice.actions;
export default measurementSlice.reducer;