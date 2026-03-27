import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

export const Forgotpassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const submitHandler = async (data) => {
        try {
            setLoading(true);

            const res = await axios.post(
                "http://localhost:5000/user/forgotpassword",
                data
            );

            if (res.status === 200) {
                alert("Reset link sent to your email ✅");
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            alert("Error sending reset link ❌");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-600 px-4">

            {/* MAIN CARD */}
            <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-md p-8">

                {/* HEADER */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Forgot Password 🔐
                    </h1>
                    <p className="text-gray-500 mt-2 text-sm">
                        Don’t worry! Enter your email and we’ll send you a reset link.
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">

                    {/* EMAIL INPUT */}
                    <div className="relative">
                        <FaEnvelope className="absolute top-4 left-3 text-gray-400" />

                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required"
                            })}
                            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-xl font-semibold text-white transition duration-300 shadow-lg 
              ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                            }`}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                {/* DIVIDER */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <span className="px-3 text-gray-400 text-sm">OR</span>
                    <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                {/* BACK TO LOGIN */}
                <button
                    onClick={() => navigate("/login")}
                    className="flex items-center justify-center gap-2 w-full border py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
                >
                    <FaArrowLeft />
                    Back to Login
                </button>

            </div>
        </div>
    );
};