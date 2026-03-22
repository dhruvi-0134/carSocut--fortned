import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function BrowseCars() {

    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);

    const [search, setSearch] = useState("");
    const [brandFilter, setBrandFilter] = useState("");
    const [fuelFilter, setFuelFilter] = useState("");
    const [priceFilter, setPriceFilter] = useState("");

    const navigate = useNavigate();

    const userId = localStorage.getItem("userId");
    const storageKey = `wishlist_${userId}`;

    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem(storageKey)) || []
    );

    // 📡 Fetch cars
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await API.get("/cars/get");
                setCars(res.data.data);
                setFilteredCars(res.data.data);
            } catch (err) {
                toast.error("Failed to load cars");
            }
        };

        fetchCars();
    }, []);

    // 🔍 FILTER LOGIC
    useEffect(() => {
        let data = [...cars];

        // Search filter
        if (search) {
            data = data.filter(car =>
                `${car.brand} ${car.model}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        // Brand filter
        if (brandFilter) {
            data = data.filter(car => car.brand === brandFilter);
        }

        // Fuel filter
        if (fuelFilter) {
            data = data.filter(car => car.fuelType === fuelFilter);
        }

        // Price filter
        if (priceFilter) {
            if (priceFilter === "low") {
                data = data.filter(car => car.price < 500000);
            } else if (priceFilter === "mid") {
                data = data.filter(car => car.price >= 500000 && car.price <= 1000000);
            } else {
                data = data.filter(car => car.price > 1000000);
            }
        }

        setFilteredCars(data);
    }, [search, brandFilter, fuelFilter, priceFilter, cars]);

    // ❤️ Toggle Wishlist
    const toggleWishlist = (car) => {
        let updated;

        const exists = wishlist.find(item => item._id === car._id);

        if (exists) {
            updated = wishlist.filter(item => item._id !== car._id);
        } else {
            updated = [...wishlist, car];
        }

        setWishlist(updated);
        localStorage.setItem(storageKey, JSON.stringify(updated));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold mb-6">Browse Cars</h1>

            {/* 🔍 SEARCH BAR */}
            <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4 items-center">

                <input
                    type="text"
                    placeholder="Search brand or model..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 border p-2 rounded"
                />

                {/* Brand */}
                <select
                    onChange={(e) => setBrandFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">All Brands</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Hyundai">Hyundai</option>
                    <option value="Tata">Tata</option>
                </select>

                {/* Fuel */}
                <select
                    onChange={(e) => setFuelFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Fuel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Electric">Electric</option>
                </select>

                {/* Price */}
                <select
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Price</option>
                    <option value="low">Below 5L</option>
                    <option value="mid">5L - 10L</option>
                    <option value="high">Above 10L</option>
                </select>

            </div>

            {/* 🚗 CAR LIST */}
            <div className="grid md:grid-cols-3 gap-6">

                {filteredCars.map((car) => {

                    const isSaved = wishlist.some(
                        item => item._id === car._id
                    );

                    return (
                        <div
                            key={car._id}
                            className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition"
                        >

                            {/* IMAGE */}
                            <img
                                src={
                                    car.media?.[0]?.mediaUrl ||
                                    "https://dummyimage.com/400x300/cccccc/000000&text=No+Image"
                                }
                                className="w-full h-48 object-cover rounded"
                            />

                            {/* TITLE + HEART */}
                            <h2 className="text-lg font-semibold mt-3 flex justify-between items-center">

                                {car.brand} {car.model}

                                <span
                                    onClick={() => toggleWishlist(car)}
                                    className="cursor-pointer text-xl"
                                >
                                    {isSaved ? (
                                        <FaHeart className="text-red-500" />
                                    ) : (
                                        <FaRegHeart className="text-gray-400" />
                                    )}
                                </span>

                            </h2>

                            <p className="text-green-600 font-bold">
                                ₹ {car.price}
                            </p>

                            <p className="text-gray-500 text-sm">
                                {car.fuelType} | {car.transmission}
                            </p>

                            <button
                                onClick={() =>
                                    navigate(`/buyer/car/${car._id}`)
                                }
                                className="mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                View Details
                            </button>

                        </div>
                    );
                })}

            </div>
        </div>
    );
}