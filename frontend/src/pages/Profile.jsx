import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

const Profile = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const token = cookies.get("token")

    const getUserProfile = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/users/user-profile", {
                withCredentials: true
            })
            console.log(res);

            setUser(res.data.user)

        } catch (error) {
            console.log(err);
            toast.error("Failed to load profile");
        }
    }

    useEffect(() => {
        getUserProfile()
    }, [])

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token])

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">

                {/* Left - Image */}
                <div className="md:w-1/3 bg-gray-50 flex flex-col items-center justify-center p-6">
                    <img
                        src={
                            user?.profile?.url
                                ? user.profile.url.startsWith("http")
                                    ? user.profile.url
                                    : `http://localhost:8000/${user.profile.url}`
                                : "https://via.placeholder.com/150"
                        }
                        alt="profile"
                        className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
                    />


                </div>

                {/* Right - Info */}
                <div className="md:w-2/3 p-8">
                    <h1 className="text-2xl font-bold mb-6">Profile</h1>

                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-500 text-sm">Name</p>
                            <p className="text-lg font-medium">{user?.name}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">Email</p>
                            <p className="text-lg font-medium">{user?.email}</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">Role</p>
                            <p className="text-lg font-medium">{user?.role}</p>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Link to="/change-password">
                            <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition">
                                Change Password
                            </button>
                        </Link>
                        <Link to="/update-profile">
                            <button className="bg-gray-800 hover:bg-gray-900 text-white px-5 py-2 rounded-lg transition">
                                Edit Profile
                            </button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile
