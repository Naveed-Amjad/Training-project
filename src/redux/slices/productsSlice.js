import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { notification } from 'antd';

export const getProducts = createAsyncThunk(
  'getProducts',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:4009/v1/products',
      });
      console.log('response ', response);
      console.log('products from database ', response.data);
      return response;
    } catch (error) {
      console.log({ error });
      return rejectWithValue(error);
    }
  }
);

// add one product into
export const addProduct = createAsyncThunk(
  'addProduct',
  async (data, { rejectWithValue }) => {
    console.log('data in addproduct ', data);
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:4009/v1/addproduct',
        data,
      });

      console.log('Response in addproduct', response);
      // Success Notification
      notification.success({
        message: 'Success',
        description: 'Product added successfully.',
        type: 'success',
      });

      return response;
    } catch (error) {
      // Error Notification
      notification.error({
        message: 'Error',
        description: 'Failed to add the product. Please try again.',
        type: 'error',
      });

      return rejectWithValue(error);
    }
  }
);

// delete product extra reducer
export const deleteProduct = createAsyncThunk(
  'deleteProduct',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'delete',
        url: `http://localhost:4009/v1/product/${data}`,
      });
      // Success Notification
      notification.success({
        message: 'Success',
        description: 'Product deleted successfully.',
        type: 'success',
      });
      return response;
    } catch (error) {
      // Error Notification
      notification.error({
        message: 'Error',
        description: 'Failed to delete product. Please try again.',
        type: 'error',
      });

      return rejectWithValue(error);
    }
  }
);

//
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    isLoading: false,
    error: null,
    success: null,
    products: null,
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      console.log('Pending runs in getProducts');
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      // const { products } = action.payload || {};
      console.log('Products in fulfilled: ', action.payload.data);
      state.isLoading = false;
      state.products = action.payload.data;
    },
    [getProducts.rejected]: (state, action) => {
      // console.log({ action });
      // const { payload: { error } } = action || {};
      console.log('rejected runs in getProducts', action.payload.response.data);
      state.isLoading = false;
      state.error = action.payload.response.data;
    },
    // delete project states
    [deleteProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      console.log('in delete product fulfilled');
      state.isLoading = false;
      state.success = action.payload.message;
    },
    [deleteProduct.rejected]: (state, action) => {
      console.log('in delete product rejected ', action.payload.message);
      state.error = action.payload;
    },
    // addProduct project states
    [addProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      console.log('in addproduct fulfilled');
      state.isLoading = false;
      // state.success = action.payload.message;
    },
    [addProduct.rejected]: (state, action) => {
      // state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
