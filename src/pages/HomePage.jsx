import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// 🔥 MAIN LOGO
import logo from "../assets/image/logo.png";

// 🔥 BRAND LOGOS (LOCAL)
import tata from "../assets/brand/tatalogo.jpg";
import bmw from "../assets/brand/bmwlogo.jpg";
import mahindra from "../assets/brand/mahindralogo.jpg";
import suzuki from "../assets/brand/marutilogo.jpg";

export const Home = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [currentImage, setCurrentImage] = useState(0);

    // 🔥 HERO IMAGES
    const images = [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
        "https://images.unsplash.com/photo-1555215695-3004980ad54e",
        "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6"
    ];

    // 🔥 AUTO SLIDER
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // 🔥 SEARCH → LOGIN
    const handleSearch = () => {
        if (!search.trim()) return;

        navigate("/login", {
            state: {
                redirectTo: `/buyer/browsecars?search=${search}`
            }
        });
    };

    // 🔥 TRENDING CARS
    const cars = [
        { name: "BMW X5", img: images[1] },
        { name: "Audi R8", img: images[2] },
        { name: "Tata Nexon", img: images[0] },
        { name: "Mahindra Thar", img: images[1] }
    ];

    // 🔥 BRAND LOGOS
    const brands = [
        { name: "Tata", img: tata },
        { name: "BMW", img: bmw },
        { name: "Mahindra", img: mahindra },
        { name: "Suzuki", img: suzuki }
    ];

    return (
        <div className="bg-gray-100">

            {/* 🔥 NAVBAR */}
            <div className="fixed w-full z-50 bg-white/70 backdrop-blur-lg px-10 py-4 flex justify-between items-center shadow">

                <img
                    src={logo}
                    alt="logo"
                    className="h-14 cursor-pointer"
                    onClick={() => navigate("/")}
                />

                <div className="flex gap-4">
                    <button
                        onClick={() => navigate("/login")}
                        className="px-5 py-2 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={() => navigate("/signup")}
                        className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {/* 🔥 HERO SECTION */}
            <div className="h-screen relative overflow-hidden">

                {/* IMAGE SLIDER */}
                {images.map((img, i) => (
                    <motion.img
                        key={i}
                        src={img}
                        className="absolute w-full h-full object-cover"
                        animate={{ opacity: currentImage === i ? 1 : 0 }}
                        transition={{ duration: 1 }}
                    />
                ))}

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* HERO TEXT */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        Find Your Perfect Ride
                    </h1>

                    <p className="text-lg mb-6 opacity-80">
                        Luxury • Performance • Reliability
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        className="bg-blue-600 px-8 py-3 rounded-full hover:bg-blue-700 transition"
                    >
                        Explore Cars
                    </button>
                </div>

                {/* 🔍 SEARCH BAR */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] bg-white p-4 rounded-2xl shadow-xl flex gap-3">
                    <input
                        type="text"
                        placeholder="Search cars..."
                        className="flex-1 p-3 border rounded-lg outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* 🚗 TRENDING CARS */}
            <div className="py-20 px-6 md:px-10">
                <h2 className="text-4xl font-bold mb-10 text-center">
                    Trending Cars
                </h2>

                <div className="flex gap-6 overflow-x-auto">

                    {cars.map((car, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            onClick={() =>
                                navigate("/login", {
                                    state: { redirectTo: "/buyer/browsecars" }
                                })
                            }
                            className="min-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                        >
                            <img
                                src={car.img}
                                alt={car.name}
                                className="h-48 w-full object-cover"
                            />

                            <div className="p-4 text-center font-semibold">
                                {car.name}
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>

            {/* 🚗 BRANDS SECTION */}
            <div className="py-16 bg-white text-center">
                <h2 className="text-3xl font-bold mb-10">
                    Top Brands
                </h2>

                <div className="flex justify-center gap-12 flex-wrap items-center">

                    {brands.map((brand, i) => (
                        <img
                            key={i}
                            src={brand.img}
                            alt={brand.name}
                            className="h-14 object-contain hover:scale-110 transition"
                        />
                    ))}

                </div>
            </div>

            {/* ✨ FEATURES */}
            <div className="py-20 px-6 md:px-10 bg-gray-50">
                <h2 className="text-4xl text-center font-bold mb-12">
                    Why CarScout?
                </h2>

                <div className="grid md:grid-cols-3 gap-10">
                    <div className="bg-white p-8 rounded-2xl shadow">
                        <h3 className="font-semibold text-xl mb-2">Smart Search</h3>
                        <p>Find cars faster with filters</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow">
                        <h3 className="font-semibold text-xl mb-2">Best Deals</h3>
                        <p>Direct negotiation system</p>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow">
                        <h3 className="font-semibold text-xl mb-2">Trusted Sellers</h3>
                        <p>Verified listings only</p>
                    </div>
                </div>
            </div>

            {/* 🔥 FOOTER */}
            <footer className="bg-black text-white py-10 text-center">
                <img src={logo} className="h-12 mx-auto mb-4" />

                <p className="text-gray-400">
                    © 2026 CarScout. All rights reserved.
                </p>
            </footer>

        </div>
    );
};