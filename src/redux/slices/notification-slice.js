import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const GetNotifications = createAsyncThunk('getNotifications', async (data, { rejectWithValue }) => {
  try {
    console.log('\n\n user id in slice ', data);
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:4009/v1/getnotifications',
      params: data
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})
// read notification
export const ReadNotification = createAsyncThunk('readNotification', async (data, { rejectWithValue }) => {
  try {
    // const _id = data;
    console.log('\n\n Read notification ID = ', data);
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/readnotification',
      data
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})
export const addUserNotification = createAsyncThunk('addUsernotification', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/addnotification',
      data
    })

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})
// admin Notification
export const addAdminNotification = createAsyncThunk('addAdminNotification', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/addnotification',
      data
    })

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: {
    isLoading: false,
    error: null,
    success: null,
    userNotifications: [],
    adminNotifications: []
  },
  reducers: {},
  extraReducers: {
    [addUserNotification.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addUserNotification.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = action?.payload?.data?.message;
      state.userNotifications = action?.payload?.data;
    },
    [addUserNotification.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.data?.message;
    },
    [addAdminNotification.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addAdminNotification.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = action?.payload?.data?.message;
      state.adminNotifications = action?.payload?.data;
    },
    [addAdminNotification.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.data?.message;
    },
    // get notifications
    [GetNotifications.pending]: (state, action) => {
      state.isLoading = true;
    },
    [GetNotifications.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log('\n\n admin notifications = ', action.payload?.data);
      state.adminNotifications = action?.payload?.data;
    },
    [GetNotifications.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.data?.error;
    },
    // read notification
    [ReadNotification.pending]: (state, action) => {
      state.isLoading = true;
    },
    [ReadNotification.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = action?.payload?.data?.message;
    },
    [ReadNotification.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.data?.error;
    }
  }
})

export default notificationSlice.reducer;
