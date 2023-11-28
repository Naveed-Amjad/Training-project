import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { notification } from 'antd';

// asyn thunk
export const loginUser = createAsyncThunk('loginUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/auth/login',
      data
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})
// signup user
export const signupUser = createAsyncThunk('signupUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/auth/signup',
      data
    })
    return response;
  } catch (error) {
    rejectWithValue(error);
  }
})
// forgot password
export const forgotPassword = createAsyncThunk('forgotpassword', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1//auth/forgotpassword',
      data
    })
    return response.data;
  } catch (error) {
    return rejectWithValue(error)
  }
})
// reset passord
export const resetPassword = createAsyncThunk('resetpassword', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1//auth/resetpassword',
      data,
    })
    return response.data;
  } catch (error) {
    return rejectWithValue(error);
  }
})
// slice
const authSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: null,
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    success: null,
    name: null,
    id: null,
    email: null
  },
  reducers: {
    resetAuthState: (state) => {
      return {
        ...state,
        loading: false,
        error: null,
        token: null,
        role: null,
        success: null,
        name: null,
        id: null,
        email: null
      }
    },
    logout: (state, action) => {
      // state.token = null;
      // state.role = null;
      localStorage.clear();
    }
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload: { data } }) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      state.loading = false;
      state.error = false;
      state.token = data?.token;
      state.role = data?.role;
      state.name = data?.name;
      state.id = data?.id;
      state.email = data?.email;
      localStorage.setItem('role', data?.role);
      localStorage.setItem('name', state?.name);
      localStorage.setItem('id', state?.id);
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [signupUser.pending]: (state, action) => {
      state.loading = true;
    },
    [signupUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = action?.payload;
      state.success = action?.payload?.data?.status;
      notification.success({
        message: 'Success',
        description: 'Signup Successfully.',
        type: 'success',
        duration: 1.5
      });
    },
    [signupUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload;
    },
    [forgotPassword.pending]: (state) => {
      return {
        ...state,
        loading: true
      }
    },
    [forgotPassword.fulfilled]: (state, action) => {
      if (action?.payload?.error) {
        notification.error({
          message: 'error',
          description: action?.payload?.error,
          type: 'error',
          duration: 1.5,
        });
      } else {
        notification.success({
          message: 'success',
          description: 'Email sent successfully',
          type: 'success',
          duration: 1.5,
        });
        return {
          ...state,
          loading: false,
          success: true
        }
      }
    },
    [forgotPassword.rejected]: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.data
      }
    },
    [resetPassword.pending]: (state) => {
      state.loading = true;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
})

export const { logout, resetAuthState } = authSlice.actions;
export default authSlice.reducer;
