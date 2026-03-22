import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function SellerDashboard() {

    const [listings, setListings] = useState([]);
    const [offers, setOffers] = useState([]);

    const fetchData = async () => {
        try {
            const listingRes = await API.get("/listings/get");
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
        <div>

            <h1 className="text-2xl font-bold mb-6">Seller Dashboard 🏢</h1>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white p-6 rounded shadow">
                    <h2>Total Listings</h2>
                    <p className="text-2xl">{listings.length}</p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2>Total Offers</h2>
                    <p className="text-2xl">{offers.length}</p>
                </div>

            </div>

            {/* RECENT LISTINGS */}
            <h2 className="text-xl font-semibold mb-4">My Listings 🚗</h2>

            {listings.slice(0, 5).map((item) => (
                <div key={item._id} className="bg-white p-3 mb-2 rounded shadow">
                    <p>{item.carId?.brand} {item.carId?.model}</p>
                </div>
            ))}

        </div>
    );
}