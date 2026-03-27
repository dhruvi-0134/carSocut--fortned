import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useParams, useNavigate, Navigate } from "react-router-dom";

export default function CarDetailed() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [index, setIndex] = useState(0);

    // ✅ Fetch Car
    useEffect(() => {
        if (id) fetchCar();
    }, [id]);

    const fetchCar = async () => {
        try {
            const res = await API.get(`/cars/get/${id}`);
            setCar(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    // ✅ Auth Check
    const token = localStorage.getItem("token");

    if (!token || token === "undefined" || token === "null") {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    if (!car) {
        return (
            <div className="flex justify-center items-center h-screen text-lg font-semibold">
                Loading...
            </div>
        );
    }

    const images = car.media || [];

    const nextImage = () => {
        if (images.length === 0) return;
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        if (images.length === 0) return;
        setIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

            {/* 🔙 BACK */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-blue-600 font-medium hover:underline"
            >
                ← Back
            </button>

            <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden grid md:grid-cols-2 gap-8 p-6">

                {/* ================= IMAGE SECTION ================= */}
                <div>

                    <div className="relative group">
                        <img
                            src={images[index]?.mediaUrl || "/no-image.png"}
                            alt="car"
                            className="w-full h-96 object-cover rounded-xl shadow-lg transition duration-500 group-hover:scale-105"
                        />

                        <div className="absolute inset-0 bg-black/10 rounded-xl"></div>

                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-3 -translate-y-1/2 
                            bg-white/70 backdrop-blur-md hover:bg-white p-2 rounded-full shadow"
                        >
                            ❮
                        </button>

                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-3 -translate-y-1/2 
                            bg-white/70 backdrop-blur-md hover:bg-white p-2 rounded-full shadow"
                        >
                            ❯
                        </button>
                    </div>

                    {/* DOTS */}
                    <div className="flex justify-center mt-4 gap-2">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`w-3 h-3 rounded-full cursor-pointer ${index === i ? "bg-blue-500 scale-110" : "bg-gray-300"
                                    }`}
                            ></div>
                        ))}
                    </div>

                    {/* THUMBNAILS */}
                    <div className="flex gap-3 mt-5 overflow-x-auto">
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img.mediaUrl}
                                alt="thumb"
                                onClick={() => setIndex(i)}
                                className={`w-24 h-16 object-cover rounded-lg cursor-pointer border-2 ${index === i
                                    ? "border-blue-500 scale-105"
                                    : "hover:border-gray-400"
                                    }`}
                            />
                        ))}
                    </div>

                </div>

                {/* ================= DETAILS ================= */}
                <div className="flex flex-col justify-between">

                    <div>

                        <h2 className="text-3xl font-bold text-gray-800">
                            {car.brand} {car.model}
                        </h2>

                        <p className="text-2xl text-green-600 font-bold mt-3">
                            ₹ {car.price}
                        </p>

                        {/* TAGS */}
                        <div className="flex gap-3 mt-4 flex-wrap text-sm">
                            <span className="bg-gray-100 px-3 py-1 rounded-full">{car.fuelType}</span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full">{car.transmission}</span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full">{car.year}</span>
                        </div>

                        {/* FULL DETAILS */}
                        <div className="grid grid-cols-2 gap-4 mt-6">

                            <div className="bg-white shadow rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Brand</p>
                                <p className="font-semibold">{car.brand}</p>
                            </div>

                            <div className="bg-white shadow rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Model</p>
                                <p className="font-semibold">{car.model}</p>
                            </div>

                            <div className="bg-white shadow rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Year</p>
                                <p className="font-semibold">{car.year}</p>
                            </div>

                            <div className="bg-white shadow rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Distance</p>
                                <p className="font-semibold">{car.distanceDriven} km</p>
                            </div>

                            <div className="bg-white shadow rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Fuel</p>
                                <p className="font-semibold">{car.fuelType}</p>
                            </div>

                            <div className="bg-white shadow rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Transmission</p>
                                <p className="font-semibold">{car.transmission}</p>
                            </div>

                            <div className="bg-white shadow rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Color</p>
                                <p className="font-semibold">{car.color}</p>
                            </div>

                            <div className="bg-white shadow rounded-xl p-4">
                                <p className="text-gray-500 text-sm">Price</p>
                                <p className="font-semibold">₹ {car.price}</p>
                            </div>

                        </div>

                        {/* DESCRIPTION */}
                        <div className="mt-6 bg-white p-4 rounded-xl shadow">
                            <p className="text-gray-500 text-sm mb-1">Description</p>
                            <p className="text-gray-700">
                                {car.description || "No description provided"}
                            </p>
                        </div>

                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-col md:flex-row gap-4 mt-8">

                        <button
                            onClick={() => {
                                const token = localStorage.getItem("token");
                                if (!token) {
                                    navigate("/login", {
                                        state: { redirectTo: `/buyer/testdrive/${car._id}` }
                                    });
                                    return;
                                }
                                navigate(`/buyer/testdrive/${car._id}`);
                            }}
                            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                        >
                            🚗 Book Test Drive
                        </button>

                        <button
                            onClick={() => {
                                const token = localStorage.getItem("token");
                                if (!token) {
                                    navigate("/login", {
                                        state: { redirectTo: `/buyer/transactions` }
                                    });
                                    return;
                                }
                                navigate("/buyer/transactions", {
                                    state: { carId: car._id }
                                });
                            }}
                            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
                        >
                            💰 Buy Now
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}