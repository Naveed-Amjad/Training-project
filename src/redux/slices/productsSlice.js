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
        params: data
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// get product details
export const getProductDetails = createAsyncThunk('getProductDetail', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:4009/v1/getproductdetails',
      params: data
    })

    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})
// top selling products
export const TopSellingProducts = createAsyncThunk('topsellingproducts', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:4009/v1/topselling'
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})

// add one product into
export const addProduct = createAsyncThunk(
  'addProduct',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        url: 'http://localhost:4009/v1/addproduct',
        data,
      });

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
// add bulk product
export const addBulkProducts = createAsyncThunk('addBulkProducts', async (data, { rejectWithValue }) => {
  try {
    const response = await axios({
      method: 'POST',
      url: 'http://localhost:4009/v1/addbulk',
      data
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})

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
// update product thunk
export const UpdateProduct = createAsyncThunk('updateproduct', async (data, { rejectWithValue }) => {
  try {
    // console.log('Update Prod Data: ', data)
    console.log('upate pro data ', data);
    const response = await axios({
      method: 'PATCH',
      url: 'http://localhost:4009/v1/updateproduct',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data
    })
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
})

//
const productsSlice = createSlice({
  name: 'products',
  initialState: {
    isLoading: false,
    error: null,
    success: null,
    products: [],
    topsellingProducts: [],
    errorArr: [],
    successfullyUpload: 0,
    uploadFailed: 0,
    itemDetails: null
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload.data;
    },
    [getProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.response?.data;
    },
    // delete project states
    [deleteProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = action.payload.message;
    },
    [deleteProduct.rejected]: (state, action) => {
      state.error = action.payload?.message;
    },
    // addProduct promise states
    [addProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = action.payload.message;
    },
    [addProduct.rejected]: (state, action) => {
      state.error = action.payload?.error;
    },
    // add bulk
    [addBulkProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addBulkProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errorArr = action?.payload?.data?.errorArr;
      state.successfullyUpload = action?.payload?.data?.successfullyUpload;
      state.uploadFailed = action?.payload?.data?.uploadFailed;
      // Success Notification
      notification.success({
        message: 'Success',
        description: 'Product added successfully.',
        type: 'success',
      });
    },
    [addBulkProducts.rejected]: (state, action) => {
      state.isLoading = false;
      // Error Notification
      notification.error({
        message: 'Error',
        description: 'Failed to add products. Please try again.',
        type: 'error',
      });
    },
    // top selling states
    [TopSellingProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [TopSellingProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.topsellingProducts = action.payload?.data;
    },
    [TopSellingProducts.rejected]: (state) => {
      state.isLoading = false;
    },
    // update product states
    [UpdateProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [UpdateProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = action.payload.data.message;
      notification.success({
        message: 'Success',
        description: state.success,
        type: 'success',
      });
    },
    [UpdateProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action?.payload?.data?.message;
    },
    // product details
    [getProductDetails.pending]: (state, action) => {
      state.isLoading = true
    },
    [getProductDetails.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.itemDetails = action?.payload?.data;
    },
    [getProductDetails.rejected]: (state, action) => {
      state.isLoading = false
    },
  },
});

export default productsSlice.reducer;
