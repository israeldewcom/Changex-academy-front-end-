import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchEarnings = createAsyncThunk(
  'earn/fetchEarnings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/earn/earnings');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  totalEarned: 0,
  pending: 0,
  withdrawn: 0,
  affiliateClicks: 0,
  conversions: 0,
  isLoading: false,
  error: null
};

const earnSlice = createSlice({
  name: 'earn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarnings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalEarned = action.payload.total || 0;
        state.pending = action.payload.pending || 0;
        state.withdrawn = action.payload.withdrawn || 0;
      })
      .addCase(fetchEarnings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default earnSlice.reducer;
