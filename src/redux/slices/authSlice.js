import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// asyn thunk
export const loginUser = createAsyncThunk('loginUser', async(data, { rejectWithValue }) => {
  // console.log('data body ', data);
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/auth/login',
      data
    })
    console.log({ response });
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }

  //   const data = await res.data;
})
// slice
const authSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    error: null,
    token: null
  },
  reducers: {
    logout: (state, action) => {
      state.token = null;
      localStorage.clear();
    }
  },
  extraReducers: {
    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, { payload: { data } }) => {
      console.log('Token value ', data);
      state.loading = false;
      state.error = false;
      state.token = data;
      localStorage.setItem('token', data);
    },
    [loginUser.rejected]: (state, action) => {
      console.log('payload in rejected', action.payload)
      state.loading = true;
      state.error = action.payload;
      console.log('password error in slice');
    }
  },
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;
