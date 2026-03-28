import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate, useLocation } from "react-router-dom";
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
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    const storageKey = userId ? `wishlist_${userId}` : "wishlist_guest";

    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem(storageKey)) || []
    );

    // ✅ GET SEARCH FROM URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearch(params.get("search") || "");
    }, [location.search]);

    // 📡 FETCH CARS
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

    // 🔍 FILTER
    useEffect(() => {
        let data = [...cars];

        if (search) {
            data = data.filter(car =>
                `${car.brand} ${car.model}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        if (brandFilter) {
            data = data.filter(car => car.brand === brandFilter);
        }

        if (fuelFilter) {
            data = data.filter(car => car.fuelType === fuelFilter);
        }

        if (priceFilter === "low") data = data.filter(car => car.price < 500000);
        if (priceFilter === "mid") data = data.filter(car => car.price >= 500000 && car.price <= 1000000);
        if (priceFilter === "high") data = data.filter(car => car.price > 1000000);

        setFilteredCars(data);

    }, [search, brandFilter, fuelFilter, priceFilter, cars]);

    // ❤️ WISHLIST
    const toggleWishlist = (car) => {
        const saved = JSON.parse(localStorage.getItem(storageKey)) || [];
        let updated;

        if (saved.find(item => item._id === car._id)) {
            updated = saved.filter(item => item._id !== car._id);
        } else {
            updated = [...saved, car];
        }

        localStorage.setItem(storageKey, JSON.stringify(updated));
        setWishlist(updated);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <h1 className="text-2xl font-bold mb-6">Browse Cars</h1>

            {/* FILTER */}
            <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4">

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2 rounded flex-1"
                />

                <select onChange={(e) => setBrandFilter(e.target.value)} className="border p-2 rounded">
                    <option value="">Brand</option>
                    <option value="BMW">BMW</option>
                    <option value="Tata">Tata</option>
                </select>

                <select onChange={(e) => setFuelFilter(e.target.value)} className="border p-2 rounded">
                    <option value="">Fuel</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                </select>

            </div>

            {/* CARS */}
            <div className="grid md:grid-cols-3 gap-6">

                {filteredCars.map((car) => {

                    const isSaved = wishlist.some(item => item._id === car._id);

                    return (
                        <div key={car._id} className="bg-white p-4 rounded-xl shadow">

                            <img src={car.media?.[0]?.mediaUrl} className="h-48 w-full object-cover rounded" />

                            <h2 className="flex justify-between mt-3 font-semibold">
                                {car.brand} {car.model}

                                <span onClick={() => toggleWishlist(car)}>
                                    {isSaved ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                                </span>
                            </h2>

                            <p className="text-green-600 font-bold">₹ {car.price}</p>

                            <button
                                onClick={() => navigate(`/buyer/car/${car._id}`)}
                                className="mt-3 w-full bg-blue-500 text-white py-2 rounded"
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