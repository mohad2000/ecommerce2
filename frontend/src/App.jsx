import "./App.css";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import ChangePassword from "./pages/ChangePassword";
import ForgetPasswordRequest from "./pages/ForgetPasswordRequest";
import ResetPassword from "./pages/resetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ViewAllUsers from "./pages/admin/ViewAllUsers";
import DashboardHome from "./pages/admin/DashboardHome";
import ViewAllOrders from "./pages/admin/ViewAllOrders";
import AddProduct from "./pages/admin/AddProduct";
import UpdateProduct from "./pages/admin/UpdateProduct";
import About from "./pages/about";
import Products from "./pages/Products";
import Contact from "./pages/Contact";

const App = () => {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin-dashboard");

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity:
                  item.quantity + (product.quantity || 1),
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: product.quantity || 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== productId)
    );
  };

  const updateQuantity = (productId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === productId
            ? {
                ...item,
                quantity: item.quantity + delta,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <>
      <ToastContainer />

      {!isAdminPage && <Navbar cartCount={cartItems.length}  />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/products" element={<Products />} />

         <Route path="/contact" element={<Contact />} />

        <Route
          path="/product-details/:id"
          element={
            <ProductDetails addToCart={addToCart} />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              clearCart={clearCart}
            />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/update-profile"
          element={<UpdateProfile />}
        />
        <Route
          path="/change-password"
          element={<ChangePassword />}
        />
        <Route
          path="/forget-password-request"
          element={<ForgetPasswordRequest />}
        />
        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        >
          <Route index element={<DashboardHome />} />

          <Route
            path="view-all-users"
            element={<ViewAllUsers />}
          />

          <Route
            path="view-all-orders"
            element={<ViewAllOrders />}
          />

          <Route
            path="add-product"
            element={<AddProduct />}
          />

          <Route
            path="update-product/:id"
            element={<UpdateProduct />}
          />
        </Route>
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
};

export default App;