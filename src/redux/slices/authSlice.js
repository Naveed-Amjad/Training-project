import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { notification } from 'antd';

// asyn thunk
export const loginUser = createAsyncThunk('loginUser', async (data, { rejectWithValue }) => {
  // console.log('data body ', data);
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/auth/login',
      data
    })
    // console.log({ response });
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }

  //   const data = await res.data;
})
// signup user
export const signupUser = createAsyncThunk('signupUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/auth/signup',
      data
    })
    console.log('Response in signup ', response);
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
    console.log('In forgot thunk');
    console.log({ response });
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
      // params: data.token
    })
    return response.data;
  } catch (error) {
    console.log('Error in reset password');
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
    id: null
  },
  reducers: {
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
      console.log('NAME = ', data.name);
      state.loading = false;
      state.error = false;
      state.token = data.token;
      state.role = data.role;
      state.name = data.name;
      state.id = data.id;
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', state.name);
      localStorage.setItem('id', state.id);
    },
    [loginUser.rejected]: (state, action) => {
      console.log('payload in rejected', action.payload)
      state.loading = false;
      state.error = action.payload;
      console.log('password error in slice');
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
      return {
        ...state,
        loading: false,
        success: true
      }
      // notification.success({
      //   message: 'Success',
      //   description: 'Password reset link sent to your email please check.',
      //   type: 'success',
      //   duration: 1.5
      // });
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
    [resetPassword.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [resetPassword.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;
