import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    // const [profile, setProfile] = useState(null);
    // const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // جلب بيانات المستخدم
    const getUserProfile = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/v1/users/user-profile", {
                withCredentials: true
            });

            setName(res.data.user.name);
            setEmail(res.data.user.email);
            // setPreview(res.data.user.profile,url);

        } catch (error) {
            console.log(error);
            toast.error("Failed to load profile");
        }
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    // التعامل مع اختيار الصورة
    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         setProfile(file);
    //         setPreview(URL.createObjectURL(file));
    //     }
    // }

    // ارسال التحديث
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
             const res = await axios.put(
                "http://localhost:8000/api/v1/users/update-profile",
                {name, email},
                {
                    withCredentials: true,
                     headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            toast.success("Profile updated successfully");
            navigate("/profile")
        } catch (error) {
            console.log(error);
             toast.error(error?.response?.data?.message || "Update failed");
        }finally {
            setLoading(false);
        }
    }

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">

                <h1 className="text-2xl font-bold mb-6 text-center">
                    Update Profile
                </h1>

                <form onSubmit={handleUpdate} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="text-gray-600 text-sm">User Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-gray-600 text-sm">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg text-white transition ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        {loading ? "Updating..." : "Save Changes"}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default UpdateProfile