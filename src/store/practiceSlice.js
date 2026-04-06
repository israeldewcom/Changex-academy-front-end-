import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchChallenges = createAsyncThunk(
  'practice/fetchChallenges',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/practice/challenges', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  challenges: [],
  currentChallenge: null,
  submissions: [],
  streak: 0,
  isLoading: false,
  error: null
};

const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    setCurrentChallenge: (state, action) => {
      state.currentChallenge = action.payload;
    },
    updateStreak: (state, action) => {
      state.streak = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallenges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChallenges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.challenges = action.payload;
      })
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentChallenge, updateStreak } = practiceSlice.actions;
export default practiceSlice.reducer;
