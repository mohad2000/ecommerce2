import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  PlusCircle,
  Users,
  ShoppingBag,
  Bell,
  Search,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import cookie from "js-cookie";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState();
  
  const navigate = useNavigate();
  const location = useLocation();

  const token = cookie.get("token");

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(
          "http://localhost:8000/api/v1/users/get-user-role",
          {
            withCredentials: true,
              headers: {
            Authorization: `Bearer ${token}`,
          },
          } 
        );

        const role = response.data.user.role;

        if (role !== "admin") {
           toast.error("You are not authorized");
          navigate("/login");
        }

      } catch (error) {
        toast.error("Authentication failed");
        navigate("/login");
      }
    };

    checkAdmin();
  }, []);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/products/get-all-products"
        );

        setProducts(response.data.products);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };

    getAllProducts();
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/admin-dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "Add Product",
      path: "/admin-dashboard/add-product",
      icon: <PlusCircle size={20} />,
    },
    {
      title: "All Users",
      path: "/admin-dashboard/view-all-users",
      icon: <Users size={20} />,
    },
    {
      title: "All Orders",
      path: "/admin-dashboard/view-all-orders",
      icon: <ShoppingBag size={20} />,
    },
  ];

  return (
   <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-50 h-full w-72 bg-slate-900 border-r border-slate-800 text-white transition-transform duration-300
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold">Dukkan</h1>
            <p className="text-xs text-slate-400 mt-1">
              Admin Dashboard
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <div className="px-4 mt-8">
          <p className="text-xs uppercase tracking-[2px] text-slate-500 font-semibold mb-4">
            Main Menu
          </p>

          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl font-medium transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* User Card */}
        <div className="absolute bottom-5 left-4 right-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100"
              alt="admin"
              className="w-12 h-12 rounded-full border-2 border-blue-500"
            />

            <div>
              <h3 className="font-semibold text-white">
                Mohammed ALalie
              </h3>

              <p className="text-sm text-slate-400">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <h2 className="text-2xl font-bold text-slate-800">
              Admin Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl w-72">
              <Search
                size={18}
                className="text-slate-500"
              />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none px-2 w-full text-slate-700"
              />
            </div>

            {/* Notifications */}
            <button className="relative bg-slate-100 border border-slate-200 p-3 rounded-xl hover:bg-slate-200 transition">
              <Bell size={20} />

              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <img
              src="https://i.pravatar.cc/150"
              alt="profile"
              className="w-11 h-11 rounded-full border-2 border-blue-500"
            />
          </div>
        </header>

        {/* Page Content */}
      <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
