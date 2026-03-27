import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
    const [cars, setCars] = useState([]);
    const [testDrives, setTestDrives] = useState([]);
    const navigate = useNavigate();

    // ✅ SAFE USER PARSE
    let user = null;
    const storedUser = localStorage.getItem("user");
    try {
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch (err) {
        console.warn("Failed to parse stored user:", err);
        localStorage.removeItem("user"); // remove corrupted data
        user = null;
    }

    const fetchData = async () => {
        try {
            const carsRes = await API.get("/cars/get");
            const testDriveRes = await API.get("/testdrives/get");

            setCars(carsRes.data?.data || []);

            if (!user?._id) return;

            // Filter test drives only for this buyer
            const myDrives = (testDriveRes.data?.data || []).filter((drive) => {
                const buyerId = typeof drive.buyerId === "object" ? drive.buyerId._id : drive.buyerId;
                return buyerId?.toString() === user._id;
            });

            setTestDrives(myDrives);
        } catch (err) {
            console.log("FETCH ERROR:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Only approved + future test drives
    const validDrives = testDrives.filter((drive) => {
        if (drive.status !== "approved") return false;
        const driveTime = new Date(drive.testDriveDate);
        return driveTime > new Date();
    });

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard 👋</h1>

            {/* Test Drive Notifications */}
            {validDrives.length > 0 && (
                <div className="mb-6 space-y-3">
                    {validDrives.map((drive) => (
                        <div
                            key={drive._id}
                            className="bg-green-100 border-l-4 border-green-500 p-4 rounded shadow"
                        >
                            <p className="font-semibold text-green-800">✅ Your Test Drive is Approved!</p>
                            <p className="text-sm text-gray-700 mt-1">🚗 {drive.carId?.brand} {drive.carId?.model}</p>
                            <p className="text-sm text-gray-700">🧑 Seller: {drive.sellerId?.companyName || "Seller"}</p>
                            <p className="text-sm text-gray-700">📅 {new Date(drive.testDriveDate).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-lg">Available Cars</h2>
                    <p className="text-3xl font-bold mt-2">{cars.length}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-lg">Test Drives</h2>
                    <p className="text-3xl font-bold mt-2">{testDrives.length}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-lg">Saved Cars</h2>
                    <p className="text-3xl font-bold mt-2">0</p>
                </div>
            </div>

            {/* Latest Cars */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Latest Cars 🚗</h2>
                <button onClick={() => navigate("/buyer/browsecars")} className="text-blue-600 hover:underline">
                    View All →
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {cars.slice(0, 6).map((car) => (
                    <div key={car._id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
                        <img
                            src={car.media?.[0]?.mediaUrl || "https://via.placeholder.com/300"}
                            alt="car"
                            className="h-40 w-full object-cover"
                        />
                        <div className="p-4">
                            <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
                            <p className="text-gray-500 text-sm">{car.year} • {car.fuelType}</p>
                            <p className="text-blue-600 font-bold mt-2">₹ {car.price}</p>
                            <button
                                onClick={() => navigate(`/buyer/car/${car._id}`)}
                                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}