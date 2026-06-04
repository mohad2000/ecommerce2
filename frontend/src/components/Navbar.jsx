import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from "../context/CartContext";
// تأكد من تثبيت lucide-react: npm install lucide-react
import { ShoppingCart, User, Menu, X, Trash2, Plus, Minus } from "lucide-react";
import axios from 'axios';
import { toast } from 'react-toastify';
import cookies from "js-cookie"

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/users/logout",
        { withCredentials: true }
      )

      toast.success("Logout successfully")
      navigate("/login")

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  const isLoggedin = cookies.get("token");

  const { cart, removeFromCart, decreaseQty, addToCart } = useCart();
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur-md shadow-sm border-b border-base-200">
      <div className="navbar-start">
        {/* Mobile menu logic remains same but cleaner */}
        <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle"><Menu /></label>
          <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/product">Products</Link></li>
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold ms-4 tracking-tight">Daraz</Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/product">Products</Link></li>
        </ul>
      </div>

      <div className="navbar-end gap-2 me-4">
        {/* Cart Drawer */}
        <div className="drawer drawer-end w-auto">
          <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
          <label htmlFor="cart-drawer" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && <span className="badge badge-sm badge-primary indicator-item">{cart.length}</span>}
            </div>
          </label>

          <div className="drawer-side z-50">
            <label htmlFor="cart-drawer" className="drawer-overlay"></label>
            <div className="menu p-4 w-80 min-h-full bg-base-100 shadow-xl flex flex-col">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ShoppingCart /> Your Cart</h2>

              <div className="flex-grow overflow-y-auto">
                {cart.map((item) => (
                  <div key={item._id} className="flex gap-4 items-center bg-base-200/50 p-3 rounded-lg mb-3">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm opacity-70">${item.price}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => decreaseQty(item._id)} className="btn btn-xs btn-circle"><Minus size={14} /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart(item)} className="btn btn-xs btn-circle"><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between font-bold text-lg mb-4">
                  <span>Total:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button className="btn btn-primary w-full">Checkout Now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost btn-circle"><User size={20} /></button>
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            <li><Link to="/profile">Profile</Link></li>
            <li><Link>Settings</Link></li>
            <li onClick={logOut}>
              {
                isLoggedin ? (
                  <Link>Logout</Link>
                ) : (
                  <Link to="/login">Login</Link>
                )
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbar
