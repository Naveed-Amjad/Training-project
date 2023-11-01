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
    // const product = item.product;
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
    paymentDetails: {}
  },
  reducers: {

    addItem: (state, action) => {
      var itemToAdd = action.payload;
      const cartItems = current(state.items).map(item => item);
      const existingItemIndex = cartItems.findIndex(
        (item) => item.product._id === itemToAdd.product?._id
      );

      if (existingItemIndex !== -1) {
        const cartItem = { ...cartItems[existingItemIndex] };
        cartItem.quantity = cartItem.quantity + itemToAdd.quantity;
        cartItems[existingItemIndex] = cartItem;
      } else {
        cartItems.push({ product: itemToAdd.product, quantity: itemToAdd.quantity });
      }

      state.items = cartItems;
      state.totalQuantity = calculateTotalQuantity(state.items);
      state.totalPrice = calculateTotal(state.items);
    },
    removeItem: (state, action) => {
      var itemToAdd = action.payload;
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
      var itemToAdd = action.payload;
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
      var itemToRemove = action.payload;
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
      console.log('In payment Details Reducer', state.paymentDetails);
    }
  },
});

export const { addItem, removeItem, removeItems, increaseQuantity, clearCart, addAddress, paymentDetails } = cartSlice.actions;

export default cartSlice.reducer;
