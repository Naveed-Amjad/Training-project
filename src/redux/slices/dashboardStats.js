import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getDashboardStats = createAsyncThunk('getDashboardStats', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:4009/v1/script?method=StartDashboardJob',
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})
const dashboardStats = createSlice({
  name: 'dashboardStats',
  initialState: {
    data: [],
    success: false,
    topSellingProducts: []
  },
  reducers: {},
  extraReducers: {
    [getDashboardStats.pending]: (state) => {
    },
    [getDashboardStats.fulfilled]: (state, action) => {
      state.data = action.payload.data[0];
      state.topSellingProducts = action?.payload?.data[0]?.topSellingProducts;
    },
    [getDashboardStats.rejected]: (state) => {
    }
  }
})

export default dashboardStats.reducer;
