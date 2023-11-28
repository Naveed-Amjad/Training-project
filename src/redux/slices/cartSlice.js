import { createSlice, current } from '@reduxjs/toolkit';
import { notification } from 'antd';

const calculateTotal = (items) => {
  let totalPrice = 0;
  for (const item of items) {
    const product = item.product;
    const quantity = item.quantity;
    totalPrice += product.price * quantity;
  }
  return totalPrice;
}
const calculateTotalQuantity = (items) => {
  let totalQuantity = 0;
  for (const item of items) {
    const quantity = item.quantity;
    totalQuantity += quantity;
  }
  return totalQuantity;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
    totalQuantity: null,
    address: {},
    color: null,
    size: null,
    paymentDetails: {}
  },
  reducers: {
    resetState: (state) => {
      return {
        ...state,
        items: [],
        totalPrice: 0,
        totalQuantity: null,
        address: {},
        paymentDetails: {}
      }
    },
    addSizeAndColor: (state, { payload }) => {
      state.color = payload.color;
      state.size = payload.size;
    },
    addItem: (state, action) => {
      const itemToAdd = action.payload;
      const cartItems = current(state.items).map(item => item);
      const existingItemIndex = cartItems.findIndex(
        (item) => item.product._id === itemToAdd.product?._id
      );

      if (existingItemIndex !== -1) {
        if (cartItems[existingItemIndex]?.product?.stock >= itemToAdd.quantity + cartItems[existingItemIndex]?.quantity) {
          const cartItem = { ...cartItems[existingItemIndex] };
          cartItem.quantity = cartItem.quantity + itemToAdd.quantity;
          cartItems[existingItemIndex] = cartItem;
        } else {
          notification.warning({
            message: 'warning',
            description: `Currently we have only ${cartItems[existingItemIndex]?.product?.stock} items in stock`,
            type: 'error',
          });
        }
      } else {
        cartItems.push({
          product: itemToAdd.product,
          quantity: itemToAdd.quantity,
          color: state.color,
          size: state.size
        });
      }

      state.items = cartItems;
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalPrice = calculateTotal(state.items);
    },
    removeItem: (state, action) => {
      const itemToAdd = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product?._id === itemToAdd.item?.product?._id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity -= itemToAdd.quantity;
      } else {
        state.items.push({ product: itemToAdd.product, quantity: itemToAdd.quantity });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalPrice = calculateTotal(state.items);
    },
    increaseQuantity: (state, action) => {
      const itemToAdd = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product?._id === itemToAdd.item?.product._id
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += itemToAdd.quantity;
      } else {
        state.items.push({ product: itemToAdd.product, quantity: itemToAdd.quantity });
      }
      localStorage.setItem('cart', JSON.stringify(state.items));
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalPrice = calculateTotal(state.items);
    },
    removeItems: (state, action) => {
      const itemToRemove = action.payload;
      state.items = state.items.filter((item) => item?.product?._id !== itemToRemove?.product?._id);
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalPrice = calculateTotal(state.items);
      localStorage.setItem('cart', JSON.stringify(state.items))
      notification.success({
        message: 'Success',
        description: 'Product Deleted from Cart Successfully.',
        type: 'success',
        duration: 2,
      });
    },
    clearCart: (state) => {
      // Clear the entire cart
      state.items = [];
      state.totalPrice = 0;
      state.address = null;
      state.totalQuantity = null;
    },
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    paymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    }
  },
});

export const {
  resetState,
  addItem,
  removeItem,
  removeItems,
  increaseQuantity,
  clearCart,
  addAddress,
  paymentDetails,
  addSizeAndColor
} = cartSlice.actions;

export default cartSlice.reducer;
