import "./App.css"
import Navbar from "./components/Navbar"
import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
  import { ToastContainer } from 'react-toastify';
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import ChangePassword from "./pages/ChangePassword";
import ForgetPasswordRequest from "./pages/ForgetPasswordRequest";
import ResetPassword from "./pages/resetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ViewAllUsers from "./pages/admin/ViewAllUsers";
import DashboardHome from "./pages/admin/DashboardHome";
import ViewAllOrders from "./pages/admin/ViewAllOrders";

const App = () => {

  return (
    
    <CartProvider>
    <ToastContainer />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/update-profile" element={<UpdateProfile/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>
        <Route path="/forget-password-request" element={<ForgetPasswordRequest/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>} />

      {/* Admin Layout */}
      <Route path="/admin-dashboard" element={<AdminDashboard />}>

        <Route index element={<DashboardHome />} />

        {/* View Users */}
        <Route
          path="view-all-users"
          element={<ViewAllUsers />}
        />

        <Route
          path="view-all-orders"
          element={<ViewAllOrders/>}
        />


      </Route>
      </Routes>
   
    <Footer/>
    </CartProvider>
  );
};

export default App
