/* eslint-disable no-unused-vars */
// Library imports
// import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import ShopingBag from './components/shopingBag/ShopingBag';
// import CustomNavbar from './components/Navbar';
// import CustomSideBar from './components/sidebar';
// import Rectangle from './components/Rectangle';
// import AgGrid from './components/AgGrid';
// import AdminLayout from './components/layout/AdminLayout';
// import CustomTable from './components/Table';
// Redux imports

// Style imports

import './App.css';
// import { useSelector } from 'react-redux';

function App() {
  console.log('App is rendering');
  // console.log('token value in App.js ', localStorage.getItem('token'));
  // const token = useSelector((state) => state.authReducer.token);
  return (
    <BrowserRouter>
      {/* {console.log(window.location.pathname)} */}
      {localStorage.getItem('token') ? ( // Admin logged in
        <AdminLayout>
          <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path="/dashboard" index element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </AdminLayout>
      ) : localStorage.getItem('user') ? (
        <>
          <UserLayout>
            <Routes>
              <Route path="/" element={<UserHome />} />
              <Route
                path="/shopingbag"
                element={<ShopingBag heading="Shoping Bag" url="shopingbag" />}
              />
              <Route
                path="/checkout"
                element={<ShopingBag heading="Checkout" url="checkout" />}
              />
            </Routes>
          </UserLayout>
        </>
      ) : (
      // No on is logged in

        <>
          {/* {showNavbar && */}
          <UserLayout>
            <Routes>
              <Route path="/" element={<UserHome />} />
              <Route path="/login" element={<Login heading="Login" />} />
              <Route path="signup" element={<Signup />} />
              <Route path="reset" element={<NewPassword />} />
              <Route path="forgotpassword" element={<ForgotPassword />} />
            </Routes>
          </UserLayout>
          {/* } */}
          {/* <Routes>
                <Route path='/login' element={<Login />} />
              </Routes> */}
        </>
        /* <Route path='/' element={<h1>Hello its client main page</h1>} />
                    <Route path='/login' element={<Login heading="Login" />} />
                    <Route path='/reset' element={<ForgotPassword />} /> */
      )}
      {/* <Login heading="Login"/> */}
      {/* <ForgotPassword heading="Forgot Password"/> */}
      {/* <NewPassword heading="New Password"/> */}
      {/* <Signup heading="SignUp"/> */}
      {/* <CustomNavbar /> */}
      {/* <CustomSideBar /> */}
      {/* <Rectangle /> */}
      {/* <AgGrid /> */}
      {/* <AdminLayout /> */}
      {/* <CustomTable /> */}
    </BrowserRouter>
  );
}

export default App;
