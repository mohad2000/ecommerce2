import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [currentAvatar, setCurrentAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [avatarBase64, setAvatarBase64] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getUserProfile = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/users/user-profile", {
                withCredentials: true
            });
            const userData = response.data.user;
            setName(userData.name || "");
            setEmail(userData.email || "");
            setCurrentAvatar(userData.profile?.url || "");
        } catch (error) {
            console.log(error);
        }
    };

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

    const updateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = { name, email };
            if (avatarBase64) payload.avatar = avatarBase64;

            await axios.put(
                "http://localhost:8000/api/v1/users/update-profile",
                payload,
                { withCredentials: true }
            );
            toast.success("Profile updated successfully");
            navigate("/profile");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4">
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Update Profile</h1>
                    <p className="text-gray-500 mt-2">Change your account information</p>
                </div>

                <form onSubmit={updateProfile} className="space-y-5">

                    {/* Avatar */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-blue-400 bg-gray-100">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="new avatar" className="w-full h-full object-cover" />
                            ) : currentAvatar ? (
                                <img src={currentAvatar} alt="current avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                    Photo
                                </div>
                            )}
                        </div>
                        <label className="cursor-pointer text-sm text-blue-600 hover:underline">
                            Change Profile Picture
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-blue-600 mb-1">User Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-blue-600 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@gmail.com"
                            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-200 disabled:opacity-60"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;