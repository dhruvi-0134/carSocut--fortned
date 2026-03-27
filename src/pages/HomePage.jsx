import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/image/logo.png";

export const Home = () => {

    const navigate = useNavigate();
    const [search, setSearch] = useState("");

    // HERO IMAGES
    const carImages = [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        "https://images.unsplash.com/photo-1555215695-3004980ad54e",
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a"
    ];

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % carImages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const handleSearch = () => {
        if (!search.trim()) return;
        navigate(`/browsecars?search=${search}`);
    };

    // BRAND DATA
    const brands = [
        { name: "Tata", img: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a" },
        { name: "BMW", img: "https://images.unsplash.com/photo-1555215695-3004980ad54e" },
        { name: "Mahindra", img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6" },
        { name: "Maruti Suzuki", img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2" }
    ];

    return (
        <div className="min-h-screen bg-gray-100">

            {/* 🔥 HEADER */}
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md flex justify-between items-center px-10 py-4">

                <img
                    src={logo}
                    alt="logo"
                    onClick={() => navigate("/")}
                    className="h-12 cursor-pointer object-contain"
                    onError={(e) => {
                        e.target.src = "https://cdn-icons-png.flaticon.com/512/743/743922.png";
                    }}
                />

                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-4 py-1 border border-blue-300 text-blue-500 rounded-lg hover:bg-blue-50"
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

            {/* 🔥 HERO */}
            <div className="relative h-[70vh] mt-20">

                <img
                    src={carImages[currentImage]}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-5xl font-bold text-white text-center">
                        Discover Premium Cars 🚗
                    </h1>
                </div>

            </div>

            {/* 🔍 SEARCH */}
            <div className="bg-white shadow-lg p-6 mt-6 mx-auto max-w-4xl rounded-xl">

                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Search cars..."
                        className="flex-1 p-3 border rounded-lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-6 rounded-lg"
                    >
                        Search
                    </button>
                </div>

            </div>

            {/* 🚗 POPULAR CARS */}
            <div className="py-12 px-10">

                <h2 className="text-3xl font-bold text-center mb-8">
                    Popular Cars
                </h2>

                <div className="grid md:grid-cols-4 gap-6">

                    {[
                        "https://images.unsplash.com/photo-1555215695-3004980ad54e",
                        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6",
                        "https://images.unsplash.com/photo-1619767886558-efdc259cde1a",
                        "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
                        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8",
                        "https://images.unsplash.com/photo-1549924231-f129b911e442",
                        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c"
                    ].map((img, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition"
                        >
                            <img src={img} className="w-full h-40 object-cover" />
                            <div className="p-3 text-center font-semibold">
                                Premium Car
                            </div>
                        </div>
                    ))}

                </div>

            </div>

            {/* 🚗 BRAND SECTION */}
            <div className="py-12 px-10">

                <h2 className="text-3xl font-bold text-center mb-8">
                    Popular Brands
                </h2>

                <div className="grid md:grid-cols-4 gap-6">

                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            onClick={() => navigate("/login")}
                            className="bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden transform hover:scale-105 transition"
                        >
                            <img src={brand.img} className="w-full h-40 object-cover" />
                            <div className="p-4 text-center font-semibold">
                                {brand.name}
                            </div>
                        </div>
                    ))}

                </div>

            </div>

            {/* FEATURES */}
            <div className="py-16 px-10">

                <h2 className="text-3xl font-bold text-center mb-10">
                    Why Choose Car Scout?
                </h2>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold mb-2">🔍 Smart Search</h3>
                        <p>Find cars easily with advanced filters.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold mb-2">🚗 Test Drive</h3>
                        <p>Book test drives instantly.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-xl font-semibold mb-2">💰 Best Deals</h3>
                        <p>Negotiate directly with sellers.</p>
                    </div>

                </div>

            </div>

            {/* 🔥 FOOTER */}
            <footer className="bg-white mt-10 py-10 shadow-inner">

                <div className="text-center mb-6">
                    <img src={logo} className="h-12 mx-auto mb-2" />
                    <p className="text-gray-500">
                        © 2026 Car Scout. All rights reserved.
                    </p>
                </div>

                {/* COMPANY LOGOS */}
                <div className="flex justify-center gap-10 flex-wrap mt-6">

                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Tata_logo.svg" className="h-10 grayscale hover:grayscale-0 transition" />

                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg" className="h-10 grayscale hover:grayscale-0 transition" />

                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Mahindra_Rise_Logo.svg" className="h-10 grayscale hover:grayscale-0 transition" />

                    <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Suzuki_logo_2.svg" className="h-10 grayscale hover:grayscale-0 transition" />

                </div>

            </footer>

        </div>
    );
};