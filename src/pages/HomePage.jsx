import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100">

            {/* NAVBAR */}
            <div className="flex justify-between items-center px-10 py-5 bg-white shadow">

                <h1 className="text-2xl font-bold text-blue-600">
                    Car Scout 🚗
                </h1>

                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-1 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </div>

            </div>

            {/* HERO SECTION */}
            <div className="flex flex-col md:flex-row items-center px-10 py-16 bg-gradient-to-r from-gray-900 to-blue-900 text-white">

                <div className="flex-1">
                    <h1 className="text-5xl font-bold mb-6">
                        Find Your Dream Car 🚗
                    </h1>

                    <p className="text-lg mb-6 text-gray-300">
                        Buy, sell and explore cars with ease. Compare prices, book test drives, and make smart decisions.
                    </p>

                    <div className="flex gap-4">

                        <button
                            onClick={() => navigate("/signup")}
                            className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Get Started
                        </button>

                        <button
                            onClick={() => navigate("/login")}
                            className="border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-black"
                        >
                            Login
                        </button>

                    </div>
                </div>

                {/* IMAGE */}
                <div className="flex-1 mt-10 md:mt-0">
                    <img
                        src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                        className="rounded-xl shadow-lg"
                    />
                </div>

            </div>

            {/* FEATURES */}
            <div className="py-16 px-10">

                <h2 className="text-3xl font-bold text-center mb-10">
                    Why Choose Car Scout?
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <h3 className="text-xl font-semibold mb-2">🔍 Smart Search</h3>
                        <p>Find cars with filters like price, brand, fuel type.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <h3 className="text-xl font-semibold mb-2">🚗 Test Drive</h3>
                        <p>Book test drives easily with sellers.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow text-center">
                        <h3 className="text-xl font-semibold mb-2">💰 Negotiation</h3>
                        <p>Negotiate prices directly with sellers.</p>
                    </div>

                </div>

            </div>

            {/* CALL TO ACTION */}
            <div className="bg-blue-600 text-white text-center py-12">

                <h2 className="text-3xl font-bold mb-4">
                    Ready to explore cars?
                </h2>

                <button
                    onClick={() => navigate("/signup")}
                    className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200"
                >
                    Join Now
                </button>

            </div>

        </div>
    );
};