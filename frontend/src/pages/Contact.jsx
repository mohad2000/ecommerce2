import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
const [formData, setFormData] = useState({
name: "",
email: "",
message: "",
});


const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // API Request Here

    setFormData({
        name: "",
        email: "",
        message: "",
    });
};

return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 pt-28 pb-32 px-4">

        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-14">

            <span
                className="inline-block px-4 py-2 rounded-full
                bg-amber-100 text-amber-700 text-sm font-medium"
            >
                Contact us
            </span>

            <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-slate-900">
                We are here to help you
            </h1>

            <p className="mt-4 text-slate-500 text-lg">
                Do you have a question or suggestion? We’d be happy to hear from you anytime.
            </p>

        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8">

            {/* Contact Info */}
            <div
                className="bg-white/80 backdrop-blur-xl
                border border-white
                rounded-3xl p-8 shadow-xl"
            >

                <h2 className="text-2xl font-bold text-slate-900 mb-8">
    Contact Information
                </h2>

                <div className="space-y-6">

                    <div
                        className="flex items-center gap-4 p-4 rounded-2xl
                        bg-slate-50 hover:bg-amber-50 transition"
                    >
                        <div
                            className="w-14 h-14 rounded-xl
                            bg-amber-100 text-amber-600
                            flex items-center justify-center"
                        >
                            <FaPhoneAlt size={20} />
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
    Phone Number
                            </p>
                            <h3 className="font-semibold text-slate-900">
                                +967 777 777 777
                            </h3>
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-4 p-4 rounded-2xl
                        bg-slate-50 hover:bg-amber-50 transition"
                    >
                        <div
                            className="w-14 h-14 rounded-xl
                            bg-amber-100 text-amber-600
                            flex items-center justify-center"
                        >
                            <FaEnvelope size={20} />
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                               Email Address
                            </p>
                            <h3 className="font-semibold text-slate-900">
                                support@example.com
                            </h3>
                        </div>
                    </div>

                    <div
                        className="flex items-center gap-4 p-4 rounded-2xl
                        bg-slate-50 hover:bg-amber-50 transition"
                    >
                        <div
                            className="w-14 h-14 rounded-xl
                            bg-amber-100 text-amber-600
                            flex items-center justify-center"
                        >
                            <FaMapMarkerAlt size={20} />
                        </div>

                        <div>
                            <p className="text-slate-500 text-sm">
                                Address
                            </p>
                            <h3 className="font-semibold text-slate-900">
                               Yemen - Sana'a
                            </h3>
                        </div>
                    </div>

                </div>

                {/* Decorative */}
                <div
                    className="mt-17 
                    
                    w-full py-4
                        bg-amber-600 text-white font-semibold
                        hover:bg-amber-700
                        shadow-lg hover:shadow-xl
                        transition-all duration-300
                        
                    rounded-3xl p-6
                   "
                >
                    
                    <h3 className="text-xl font-bold mb-2">
                       Contact Us
                    </h3>

                    <p className="text-amber-100">
We'd love to hear from you. Send us a message and we'll respond as soon as possible.                    </p>
                </div>

            </div>

            {/* Contact Form */}
            <div
                className="bg-white/80 backdrop-blur-xl
                border border-white
                rounded-3xl p-8 shadow-xl"
            >

                <h2 className="text-2xl font-bold text-slate-900 mb-8">
                   Send a Message
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="block mb-2 text-slate-700 font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-2xl
                            border border-slate-200
                            focus:outline-none
                            focus:ring-4 focus:ring-amber-100
                            focus:border-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-slate-700 font-medium">
                           Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-2xl
                            border border-slate-200
                            focus:outline-none
                            focus:ring-4 focus:ring-amber-100
                            focus:border-amber-500"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-slate-700 font-medium">
                            Message
                        </label>

                        <textarea
                            rows="6"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-2xl
                            border border-slate-200
                            resize-none
                            focus:outline-none
                            focus:ring-4 focus:ring-amber-100
                            focus:border-amber-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 rounded-2xl
                        bg-amber-600 text-white font-semibold
                        hover:bg-amber-700
                        shadow-lg hover:shadow-xl
                        transition-all duration-300"
                    >
                       Send Message
                    </button>

                </form>

            </div>

        </div>

    </div>
);

};

export default Contact;
