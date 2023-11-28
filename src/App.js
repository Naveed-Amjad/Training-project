/* eslint-disable no-unused-vars */
// Library imports
// import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
// component imports
import AdminLayout from './components/layout/adminLayout/AdminLayout';
import UserLayout from './components/layout/userLayout/UserLayout';
import UserHome from './components/layout/userLayout/UserHome';
import Login from './container/auth/Login';
import Products from './components/products';
import Orders from './components/orders';
import Dashboard from './components/dashboard';
import Signup from './container/auth/Signup';
import NewPassword from './container/auth/NewPassword';
import ForgotPassword from './container/auth/ForgotPassword';
// import ResetPassword from './container/auth/ResetPassword';
import ShopingBag from './components/shopingBag/ShopingBag';
import PageNotFound from './components/utils/PageNotFound';
import UserOrderPage from './components/orders/userOrderPage';
// Redux imports

// Style imports

import './App.css';

// import { useSelector } from 'react-redux';

function App() {
  const { token, role } = useSelector((state) => state.authReducer);
  return (
    <BrowserRouter>
      {token && role === 'admin' ? ( // Admin logged in
        <Routes>
          <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/dashboard" index element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/products" element={<AdminLayout><Products /></AdminLayout>} />
          <Route path="/orders" element={<AdminLayout><Orders /></AdminLayout>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      ) : token && role === 'user' ? (
        <>

          <Routes>
            <Route path="/" element={<UserLayout><UserHome /></UserLayout>} />
            <Route
              path="/shopingbag"
              exact
              element={<UserLayout><ShopingBag heading="Shoping Bag" url="shopingbag" /></UserLayout>}
            />
            <Route
              path="/checkout"
              element={<UserLayout><ShopingBag heading="Checkout" url="checkout" /></UserLayout>}
            />
            <Route path="/userorderpage" element={<UserOrderPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      ) : (
        // No one is logged in
        <>
          <Routes>
            <Route
              path="/"
              element={
                <UserLayout>
                  <UserHome />
                </UserLayout>
              }
            />
            <Route path="/login" element={<Login heading="Login" />} />
            <Route path="signup" element={<Signup />} />
            <Route path="reset" element={<NewPassword />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
