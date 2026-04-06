import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchPosts = createAsyncThunk(
  'community/fetchPosts',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/community/posts', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const initialState = {
  posts: [],
  groups: [],
  currentGroup: null,
  isLoading: false,
  error: null
};

const communitySlice = createSlice({
  name: 'community',
  initialState,
  reducers: {
    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentGroup } = communitySlice.actions;
export default communitySlice.reducer;
