import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import cookies from "js-cookie";
import { NavLink } from "react-router-dom";

const Navbar = ({ cartCount = 0 }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedin = cookies.get("token");

  // تغيير شكل النافبار عند السكروول
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // جلب البروفايل
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/users/user-profile",
          { withCredentials: true }
        );
        setUser(data.user);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/logout",
        { withCredentials: true }
      );

      cookies.remove("token");
      toast.success(response.data.message);
      navigate("/login");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/70 backdrop-blur-md shadow-md"
          : "bg-transparent"
        }
      `}
    >
      <div className="navbar max-w-6xl mx-auto px-4">

        {/* LEFT */}
        <div className="navbar-start">

          {/* Mobile menu */}
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              ☰
            </div>

            <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <Link to="/" className="text-2xl font-bold text-indigo-600 ml-2">
            Dukkan
          </Link>
        </div>

        {/* CENTER */}
        {/* CENTER */}
<div className="navbar-center hidden lg:flex">
  <ul className="menu menu-horizontal gap-6 font-medium">

    {[
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ].map((item) => (
      <li key={item.path} className="relative group">
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `
            relative px-1 py-2 transition-all duration-300
            ${isActive ? "text-indigo-600" : "text-gray-700"}
            `
          }
        >
          {item.name}

          {/* underline animation */}
          <span
            className="
              absolute left-0 -bottom-1 h-[2px] w-0 bg-indigo-500
              transition-all duration-300 group-hover:w-full
            "
          />
        </NavLink>
      </li>
    ))}

  </ul>
</div>
        {/* RIGHT */}
        <div className="navbar-end flex items-center gap-4">

          {/* CART */}
          <Link to="/cart" className="btn btn-ghost btn-circle relative">
            🛒
            {cartCount > 0 && (
              <span className="badge badge-sm absolute -top-1 -right-1">
                {cartCount}
              </span>
            )}
          </Link>

          {/* PROFILE */}
          <div className="dropdown dropdown-end ml-2">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border border-gray-300">
                <img
                  src={
                    user?.profile?.url ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="profile"
                />
              </div>
            </div>

            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
              <li><Link to="/profile">Profile</Link></li>
              <li><Link>Settings</Link></li>

              <li>
                {isLoggedin ? (
                  <button onClick={logout} className="text-left w-full">
                    Logout
                  </button>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Navbar;