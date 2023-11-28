import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

export const AddCustomer = createAsyncThunk('addCustomer', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/createcustomer',
      data
    })
    return response;
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const DeductCharges = createAsyncThunk('deductCharges', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/deductcharges',
      data
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})

export const GetUserCards = createAsyncThunk('GetUserCards', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/usercards',
      data
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})

const paymentSlice = createSlice({
  name: 'paymentSlice',
  initialState: {
    cardId: null,
    customerId: null,
    success: null,
    error: null,
    isLoading: false,
    userCards: []
  },
  reducers: {},
  extraReducers: {
    [AddCustomer.pending]: (state, action) => {
      state.isLoading = true;
    },
    [AddCustomer.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = action?.payload?.data?.message;
      state.cardId = action?.payload?.data?.card;
      state.customerId = action?.payload?.data?.customer_Id;
      // Success Notification
      notification.success({
        message: 'Success',
        description: 'Payment Details Added successfully.',
        type: 'success',
        duration: 1.5
      });
    },
    [AddCustomer.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.error;
      // Error Notification
      notification.error({
        message: 'Error',
        description: 'Failed to Add Payment Details. Please try Again.',
        type: 'error',
        duration: 1.5
      });
    },
    // charge deduction
    [DeductCharges.pending]: (state, action) => {
      state.isLoading = true;
    },
    [DeductCharges.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = action?.payload?.data?.message;
    },
    [DeductCharges.rejected]: (state, action) => {
      state.error = action?.payload?.error;
    },
    // GetUserCards
    [GetUserCards.pending]: (state, action) => {
      state.isLoading = true;
    },
    [GetUserCards.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.userCards = action?.payload?.data;
    },
    [GetUserCards.rejected]: (state, action) => {
      state.isLoading = false;
      state.success = false;
    }
  }
})

export default paymentSlice.reducer;
