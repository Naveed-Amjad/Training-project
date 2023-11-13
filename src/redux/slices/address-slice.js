import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

// add new address
export const addNewAddress = createAsyncThunk('addNewAddress', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/newaddress',
      data
    })

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})
// get user address
export const getUserAddress = createAsyncThunk('getUserAddress', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:4009/v1/getaddress',
      params: data
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})
const addressSlice = createSlice({
  name: 'address',
  initialState: {
    isLoading: false,
    success: false,
    error: false,
    userAddress: []
  },
  reducers: {},
  extraReducers: {
    [addNewAddress.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addNewAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = action?.payload?.data?.message;
      notification.success({
        message: 'Success',
        description: action?.payload?.data?.message,
        type: 'success',
        duration: 1.5
      });
    },
    [addNewAddress.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message;

      notification.error({
        message: 'error',
        description: state.error,
        type: 'error',
        duration: 1.5
      });
    },
    // get address
    [getUserAddress.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getUserAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.userAddress = action?.payload?.data;
    },
    [getUserAddress.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.message;
    }
  }
})

export default addressSlice.reducer;
