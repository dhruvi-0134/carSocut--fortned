import React, { useEffect, useState, useRef } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";
import io from "socket.io-client";

export default function BuyerOffers() {
    const [offers, setOffers] = useState([]);
    const [buyer, setBuyer] = useState(null);
    const socketRef = useRef(null); // ✅ FIX socket issue

    // ✅ Get logged-in buyer
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) setBuyer(user);
    }, []);

    // ✅ Fetch offers
    useEffect(() => {
        if (!buyer?._id) return;

        const fetchOffers = async () => {
            try {
                const res = await API.get("/offers/get");

                const myOffers = res.data.data.filter(
                    (offer) => offer.buyerId?._id === buyer._id
                );

                setOffers(myOffers);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load offers");
            }
        };

        fetchOffers();
    }, [buyer]);

    // ✅ Real-time socket (FIXED)
    useEffect(() => {
        if (!buyer?._id) return;

        socketRef.current = io("http://localhost:5000");
        socketRef.current.on(`offer_${buyer._id}`, (newOffer) => {
            toast.info("💰 New Offer Received!");

            setOffers((prev) => {
                const exists = prev.some(o => o._id === newOffer._id);
                if (exists) return prev;
                return [newOffer, ...prev];
            });
        });


        return () => {
            socketRef.current.disconnect(); // ✅ prevent multiple connections
        };
    }, [buyer]);

    return (
        <div className="min-h-screen bg-gray-100 p-8">

            {/* HEADER */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                💬 Your Car Offers
            </h1>

            {/* EMPTY STATE */}
            {offers.length === 0 && (
                <div className="text-center text-gray-500 mt-20">
                    No offers yet 😔
                </div>
            )}

            {/* OFFER CARDS */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => {
                    const car = offer.carId;

                    // ✅ CORRECT IMAGE LOGIC (ONLY REAL IMAGE)
                    const image = car?.media?.[0]?.mediaUrl
                        ? car.media[0].mediaUrl.startsWith("http")
                            ? car.media[0].mediaUrl
                            : `http://localhost:5000/${car.media[0].mediaUrl}`
                        : null;

                    const realPrice = car?.price || 0;
                    const offerPrice = offer?.offeredPrice || 0;

                    const discount =
                        realPrice > 0
                            ? Math.round(((realPrice - offerPrice) / realPrice) * 100)
                            : 0;

                    return (
                        <div
                            key={offer._id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition overflow-hidden"
                        >

                            {/* IMAGE */}
                            {image ? (
                                <img
                                    src={image}
                                    alt="car"
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                    }}
                                />
                            ) : (
                                <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-500">
                                    No Image Available
                                </div>
                            )}

                            {/* CONTENT */}
                            <div className="p-5 space-y-3">

                                {/* CAR NAME */}
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {car?.brand} {car?.model} ({car?.year})
                                </h2>

                                {/* SELLER */}
                                <p className="text-sm text-gray-500">
                                    Seller: {offer.sellerId?.companyName || "Unknown"}
                                </p>

                                {/* PRICE */}
                                <div className="flex items-center space-x-3">
                                    <span className="text-gray-400 line-through text-sm">
                                        ₹{realPrice.toLocaleString()}
                                    </span>

                                    <span className="text-xl font-bold text-green-600">
                                        ₹{offerPrice.toLocaleString()}
                                    </span>

                                    {discount > 0 && (
                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-lg">
                                            {discount}% OFF
                                        </span>
                                    )}
                                </div>

                                {/* EXTRA INFO */}
                                <div className="text-sm text-gray-600 space-y-1">
                                    <p>Fuel: {car?.fuelType || "N/A"}</p>
                                    <p>Transmission: {car?.transmission || "N/A"}</p>
                                    <p>KM Driven: {car?.distanceDriven || "N/A"}</p>
                                </div>

                                {/* DATE */}
                                <p className="text-xs text-gray-400 mt-2">
                                    📅 {new Date(offer.offerDate).toLocaleDateString()}
                                </p>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}