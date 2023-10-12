import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../slices/authSlice'
import productsReducer from '../slices/productsSlice';
// store
const store = configureStore({
  reducer: { authReducer, productsReducer }
})

export default store
