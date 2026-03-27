import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedCars() {
    const navigate = useNavigate();

    // ✅ SAFE USER FETCH
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
        console.warn("User parse error:", err);
        user = null;
    }

    const userId = user?._id;

    // ✅ SAFE STORAGE KEY (IMPORTANT)
    const storageKey = userId ? `wishlist_${userId}` : "wishlist_guest";

    const [cars, setCars] = useState([]);

    // ✅ LOAD SAVED CARS
    useEffect(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
            setCars(saved);
        } catch (err) {
            console.error("Wishlist parse error:", err);
            setCars([]);
        }
    }, [storageKey]);

    // ✅ REMOVE CAR
    const removeCar = (id) => {
        const updated = cars.filter((car) => car._id !== id);
        setCars(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <h2 className="text-2xl font-bold mb-4">
                ❤️ Saved Cars ({cars.length})
            </h2>

            {cars.length === 0 ? (
                <div className="text-center mt-10 text-gray-500">
                    <p className="text-lg">No saved cars</p>
                    <button
                        onClick={() => navigate("/buyer/browsecars")}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Browse Cars 🚗
                    </button>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">

                    {cars.map((car) => (
                        <div
                            key={car._id}
                            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
                        >

                            <img
                                src={
                                    car.media?.[0]?.mediaUrl ||
                                    "https://dummyimage.com/400x300/cccccc/000000&text=No+Image"
                                }
                                alt="car"
                                className="h-40 w-full object-cover rounded cursor-pointer"
                                onClick={() =>
                                    navigate(`/buyer/car/${car._id}`)
                                }
                            />

                            <h3 className="text-lg font-bold mt-2">
                                {car.brand} {car.model}
                            </h3>

                            <p className="text-green-600 font-semibold">
                                ₹ {car.price}
                            </p>

                            <p className="text-gray-500 text-sm">
                                {car.fuelType} | {car.transmission}
                            </p>

                            <button
                                onClick={() => removeCar(car._id)}
                                className="bg-red-500 text-white px-3 py-2 rounded mt-3 w-full hover:bg-red-600"
                            >
                                Remove ❤️
                            </button>

                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}