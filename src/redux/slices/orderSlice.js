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
    console.log('\n\n data ==>> ', data);
    const response = await axios({
      method: 'post',
      url: 'http://localhost:4009/v1/getorders',
      data,
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})
//
export const UserOrders = createAsyncThunk('userorders', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/userorders',
      data: { orderId: data.userId, skip: data.skip, limit: data.limit },
      headers: {
        Authorization: `Bearer ${data.token}`
      }
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})
// deliver order
export const DeliverOrder = createAsyncThunk('deliverorder', async (data, { rejectWithValue }) => {
  try {
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
// admin order details
export const AdminOrderDetails = createAsyncThunk('AdminOrderDetails', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:4009/v1/order-details',
      params: data,
      headers: {
        Authorization: `Bearer ${data.token}`
      }
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
    userOrders: [],
    adminOrderDetails: null,
    totalCount: 0
  },
  reducers: {
    SetState(state, { payload: { field, value } }) {
      state[field] = value;
    },
    clearSuccess: (state, action) => {
      state.success = null
    },
    clearUserOrderState: (state, action) => {
      state.userOrders = null
    }
  },
  extraReducers: {
    [PlaceOrder.pending]: (state, action) => {
      state.loading = true;
    },
    [PlaceOrder.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = false;
    },
    [PlaceOrder.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.success = false;
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
    },
    [UserOrders.pending]: (state) => {
      state.loading = true;
    },
    [UserOrders.fulfilled]: (state, { payload: { data } }) => {
      state.loading = false;
      state.userOrders = data?.orders;
      state.totalCount = data?.totalDocuments;
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
    // AdminOrderDetails
    [AdminOrderDetails.pending]: (state, action) => {
      state.loading = true;
    },
    [AdminOrderDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.adminOrderDetails = action?.payload?.data;
    },
    [AdminOrderDetails.rejected]: (state, action) => {
      state.loading = false;
    },
  }
})
export const { clearUserOrderState, clearSuccess } = orderSlice.actions;
export default orderSlice.reducer;
