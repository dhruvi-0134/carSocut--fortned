import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaLock, FaArrowLeft } from "react-icons/fa";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);

    const submitHandler = async (data) => {
        try {
            setLoading(true);

            const payload = {
                newPassword: data.newPassword,
                token: token,
            };

            await axios.put(
                "http://localhost:5000/user/resetpassword",
                payload
            );

            toast.success("Password reset successful ✅");
            navigate("/login");

        } catch (err) {
            console.log(err);
            toast.error(
                err.response?.data?.message || "Error resetting password ❌"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-indigo-500 to-blue-500 px-4">

            {/* CARD */}
            <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-md p-8">

                {/* HEADER */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Reset Password 🔑
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Enter your new password below
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">

                    {/* NEW PASSWORD */}
                    <div className="relative">
                        <FaLock className="absolute top-4 left-3 text-gray-400" />

                        <input
                            type="password"
                            placeholder="New Password"
                            {...register("newPassword", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters",
                                },
                            })}
                            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />

                        {errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.newPassword.message}
                            </p>
                        )}
                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="relative">
                        <FaLock className="absolute top-4 left-3 text-gray-400" />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register("confirmPassword", {
                                required: "Confirm your password",
                                validate: (value) =>
                                    value === watch("newPassword") || "Passwords do not match",
                            })}
                            className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
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
                        {loading ? "Updating..." : "Reset Password"}
                    </button>
                </form>

                {/* DIVIDER */}
                <div className="flex items-center my-6">
                    <div className="flex-grow h-px bg-gray-200"></div>
                    <span className="px-3 text-gray-400 text-sm">OR</span>
                    <div className="flex-grow h-px bg-gray-200"></div>
                </div>

                {/* BACK BUTTON */}
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

export default ResetPassword;