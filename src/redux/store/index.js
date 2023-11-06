import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'
import productsReducer from '../slices/productsSlice';
import cartReducer from '../slices/cartSlice';
import orderReducer from '../slices/orderSlice';
import notificationReducer from '../slices/notification-slice';
import dashboardStatsReducer from '../slices/dashboardStats';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
// store
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer']
};

const reducers = combineReducers({
  authReducer,
  productsReducer,
  cartReducer,
  orderReducer,
  notificationReducer,
  dashboardStatsReducer
});

const rootReducer = (state, action) => {
  // if (action.type === 'login/logout') {
  //   state = undefined;
  // }
  return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger],
  devTools: true
});
