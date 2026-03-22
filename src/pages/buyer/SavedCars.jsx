import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SavedCars() {

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const storageKey = `wishlist_${userId}`;

    const [cars, setCars] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
        setCars(saved);
    }, [storageKey]);

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
                <p>No saved cars</p>
            ) : (
                <div className="grid md:grid-cols-3 gap-6">

                    {cars.map((car) => (
                        <div
                            key={car._id}
                            className="bg-white p-4 rounded-xl shadow"
                        >

                            <img
                                src={car.media?.[0]?.mediaUrl}
                                alt="car"
                                className="h-40 w-full object-cover rounded cursor-pointer"
                                onClick={() =>
                                    navigate(`/buyer/car/${car._id}`)
                                }
                            />

                            <h3 className="text-lg font-bold mt-2">
                                {car.brand} {car.model}
                            </h3>

                            <p className="text-green-600">
                                ₹ {car.price}
                            </p>

                            <button
                                onClick={() => removeCar(car._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded mt-3 w-full"
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