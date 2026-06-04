import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPasswordRequest = () => {
  const [email, setEmail] = useState();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formData = {email}

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const forgetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/reset-password-request",
        formData
      );

      toast.success(response.data.message);

      // التحويل بعد نجاح الطلب
      navigate("/login");
      
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Password reset request failed ❌"
      );
    } finally {
      setLoading(false);
    }}
    forgetPassword()
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Enter Your Email
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            You already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordRequest;