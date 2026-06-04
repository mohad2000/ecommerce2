import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const navigate = useNavigate();
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation
        // if (!oldPassword || !newPassword || !confirmNewPassword) {
        //     return toast.error("All fields are required");
        // }

        // if (newPassword.length < 8) {
        //     return toast.error("Password must be at least 8 characters");
        // }

        // if (newPassword !== confirmNewPassword) {
        //     return toast.error("Passwords do not match");
        // }

        try {
            setLoading(true);
            const response = await axios.put(
                "http://localhost:8000/api/v1/users/update-password",
                {
                    oldPassword,
                    newPassword,
                    confirmNewPassword
                },
                {
                    withCredentials: true,
                }
            );

            toast.success(response.data.message || "Password updated");

            // تفريغ الحقول
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            navigate("/profile")
        } catch (error) {
            console.log(error.response)
            console.log(error.response?.data)
            toast.error(error?.response?.data?.message || "Something went wrong")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Change Password
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Old Password */}
                    <div>
                        <label className="text-gray-600 text-sm">Old Password</label>
                        <div className="relative">
                            <input
                                type={showOld ? "text" : "password"}
                                value={oldPassword}
                                autoComplete="old-password"
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <span
                                onClick={() => setShowOld(!showOld)}
                                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                            >
                                👁️
                            </span>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-gray-600 text-sm">New Password</label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                value={newPassword}
                                autoComplete="new-password"
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <span
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                            >
                                👁️
                            </span>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-gray-600 text-sm">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                value={confirmNewPassword}
                                autoComplete="confirm-password"
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <span
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-3 cursor-pointer text-gray-500"
                            >
                                👁️
                            </span>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg text-white transition ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                    >
                        {loading ? "Updating..." : "Update Password"}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ChangePassword;