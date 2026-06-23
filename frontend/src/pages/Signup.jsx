import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // رفع الصورة وتحويلها Base64
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatarPreview(reader.result);
      setAvatarBase64(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    if (!avatarBase64) {
      toast.error("Please select a profile picture");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:8000/api/v1/users/register-user",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          avatar: avatarBase64,
        }
      );

      const token = res.data.token;

      Cookies.set("token", token, {
        expires: 7,
      });

      toast.success("User SignUp Successfully");

      const user = res.data.user;

      if (user?.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-500 bg-gray-100">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Photo
                </div>
              )}
            </div>

            <label className="cursor-pointer text-indigo-600 hover:underline text-sm">
              Choose Profile Picture
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

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

            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 disabled:opacity-60"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:underline"
            >
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Signup;