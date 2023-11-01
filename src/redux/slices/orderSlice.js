import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

export const PlaceOrder = createAsyncThunk('placeorder', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/placeorder',
      data
    })

    return response;
  } catch (error) {
    console.log('Error in placing order catch block');
    return rejectWithValue(error);
  }
})

export const GetOrders = createAsyncThunk('getorder', async (data, { rejectWithValue }) => {
  try {
    const Data = { searchById: data }
    // console.log('DATA in GetOrders = ', Data);
    const response = await axios({
      method: 'post',
      url: 'http://localhost:4009/v1/getorders',
      data: Data
    })
    return response;
  } catch (error) {
    console.log('Error in getting orders catch block');
    return rejectWithValue(error);
  }
})
//
export const UserOrders = createAsyncThunk('userorders', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/userorders',
      data
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})
// deliver order
export const DeliverOrder = createAsyncThunk('deliverorder', async (data, { rejectWithValue }) => {
  // const { orderId } = data;
  try {
    console.log('DATA ID = ', data);
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/deliverorder',
      data
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    loading: false,
    error: null,
    success: null,
    orders: [],
    userOrders: []
  },
  reducers: {
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    }
  },
  extraReducers: {
    [PlaceOrder.pending]: (state, action) => {
      state.loading = true;
      console.log('In orderSlice Pending');
    },
    [PlaceOrder.fulfilled]: (state, action) => {
      state.loading = false;
      console.log('Payload in orderSlice Fulfilled ', action.payload);
      state.success = true;
      state.error = false;
    },
    [PlaceOrder.rejected]: (state, action) => {
      console.log('In orderSlice Rejected');
      state.loading = false;
      state.error = true;
      state.success = false;
      console.log('Payload in orderSlice Rejected ', action.payload);
      notification.error({
        message: 'error',
        description: action?.payload?.message,
        type: 'success',
        duration: 2,
      });
    },
    [GetOrders.pending]: (state) => {
      state.loading = true;
    },
    [GetOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.orders = action.payload.data;
    },
    [GetOrders.rejected]: (state, action) => {
      state.loading = false;
      console.log('PAYLOAD In rejected = ', action.payload);
    },
    [UserOrders.pending]: (state) => {
      state.loading = true;
      console.log('pending pending');
    },
    [UserOrders.fulfilled]: (state, action) => {
      state.loading = false;
      state.userOrders = action.payload?.data;
    },
    [UserOrders.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
    // deliver order states
    [DeliverOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [DeliverOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = action.payload.data.message;
      notification.success({
        message: 'Success',
        description: state.success,
        type: 'success',
        duration: 2,
      });
    },
    [DeliverOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload?.response?.data;
    },
  }
})

export default orderSlice.reducer;