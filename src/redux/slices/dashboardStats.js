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
    console.log('Error in get dashboard stats');
    return rejectWithValue(error);
  }
})
const dashboardStats = createSlice({
  name: 'dashboardStats',
  initialState: {
    data: [],
    success: false,
  },
  reducers: {},
  extraReducers: {
    [getDashboardStats.pending]: (state) => {
      console.log('In pending');
    },
    [getDashboardStats.fulfilled]: (state, action) => {
      console.log('ACTION aaaaa = ', action.payload);
      state.data = action.payload.data[0];
    },
    [getDashboardStats.rejected]: (state) => {
      console.log('In rejected');
    }
  }
})

export default dashboardStats.reducer;
