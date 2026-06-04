import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
    const { token } = useParams()
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate()

    const formData = { password, confirmPassword }
    const handleResetPassword = (e) => {
        e.preventDefault();
        const resetPassword = async () => {
            try {
                const response = await axios.put(`http://localhost:8000/api/v1/users/reset-password/${token}`, formData);
               
                toast.success(response.data.message)
                navigate("/login")
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }

        resetPassword()
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">

            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
                    <p className="text-gray-500 mt-2">Now Reset your password</p>
                </div>

                {/* Form */}
                <form onSubmit={handleResetPassword} className="space-y-5">

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-blue-600 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:text-blue-600 transition"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-blue-600 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:text-blue-600 transition"
                            required
                        />
                    </div>



                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;