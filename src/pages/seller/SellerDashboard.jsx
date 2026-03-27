import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { formatIndianPrice, formatCompactPrice } from "../../utils/priceFormatter";

export default function SellerDashboard() {

    const [listings, setListings] = useState([]);
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const listingRes = await API.get("/listings/my");
            const offerRes = await API.get("/offers/get");

            setListings(listingRes.data.data);
            setOffers(offerRes.data.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div
            className="min-h-screen bg-cover bg-center p-6"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7')"
            }}
        >

            {/* DARK OVERLAY */}
            <div className="bg-black/70 min-h-screen p-6 rounded-xl">

                {/* HEADER */}
                <h1 className="text-4xl font-bold mb-10 text-white">
                    Seller Dashboard 🏢
                </h1>

                {/* 🔥 STATS */}
                <div className="grid md:grid-cols-2 gap-6 mb-10">

                    {/* LISTINGS */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-xl">
                        <h2 className="text-lg">Total Listings</h2>
                        <p className="text-4xl font-bold mt-2">
                            {listings.length}
                        </p>
                    </div>

                    {/* OFFERS */}
                    <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-xl">
                        <h2 className="text-lg">Total Offers</h2>
                        <p className="text-4xl font-bold mt-2">
                            {offers.length}
                        </p>
                    </div>

                </div>

                {/* 🔥 RECENT LISTINGS */}
                <h2 className="text-2xl font-semibold mb-6 text-white">
                    My Listings 🚗
                </h2>

                {listings.length === 0 ? (
                    <p className="text-gray-300">No listings yet</p>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">

                        {listings.slice(0, 6).map((item) => {



                            const car = item.carId;
                            const onRoadPrice = Math.round(car.price * 1.1); // ✅ important

                            return (
                                <div
                                    key={item._id}
                                    className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl hover:scale-105 transition duration-300"
                                >

                                    {/* IMAGE */}
                                    <img
                                        src={car.media?.[0]?.mediaUrl || "https://via.placeholder.com/300"}
                                        className="h-40 w-full object-cover rounded-lg "
                                        onClick={() => navigate(`/car/${car._id}`)}
                                        alt="car"
                                    />

                                    {/* DETAILS */}
                                    <h3 className="mt-3 font-semibold text-lg">
                                        {car.brand} {car.model}
                                    </h3>

                                    {/* ✅ ON-ROAD PRICE */}
                                    <p className="text-blue-400 font-bold">
                                        {formatCompactPrice(onRoadPrice)}
                                    </p>

                                    {/* ✅ EXTRA UX */}
                                    <p className="text-xs text-green-400">
                                        On-road (incl. RTO + Insurance)
                                    </p>

                                    {/* ✅ EX-SHOWROOM */}
                                    <p className="text-sm text-gray-400">
                                        Ex-showroom: ₹ {formatIndianPrice(car.price)}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {car.fuelType} • {car.transmission}
                                    </p>

                                    {/* STATUS */}
                                    <p className={`mt-2 font-medium ${item.status === "sold"
                                        ? "text-red-500"
                                        : "text-green-600"
                                        }`}>
                                        Status: {item.status}
                                    </p>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>
        </div>
    );
}