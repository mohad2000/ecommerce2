import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/login-user",
        formData
      );

      const token = res.data.token
      Cookies.set("token", token, {
        expires: 7
      })

      const user = res.data.user; // مهم جدًا إذا السيرفر يرجعه

      toast.success(res.data.message)

      // 👇 هنا التوجيه الصحيح
      if (user?.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none pr-16"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-indigo-600 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>


            <div className="flex justify-end">
              <p className="text-sm text-gray-500 mt-1 cursor-pointer hover:underline">
                <Link to="/forget-password-request"> Forgot password ? </Link>
              </p>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup Link */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;