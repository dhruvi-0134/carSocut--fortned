import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function UserDashboard() {

    const [cars, setCars] = useState([]);
    const [testDrives, setTestDrives] = useState([]);

    const fetchData = async () => {
        try {
            const carsRes = await API.get("/cars/get");
            const testDriveRes = await API.get("/testdrive/get");

            setCars(carsRes.data.data);
            setTestDrives(testDriveRes.data.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>

            <h1 className="text-2xl font-bold mb-6">User Dashboard 👤</h1>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-lg font-semibold">Available Cars</h2>
                    <p className="text-2xl">{cars.length}</p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-lg font-semibold">Test Drives</h2>
                    <p className="text-2xl">{testDrives.length}</p>
                </div>

            </div>

            {/* RECENT CARS */}
            <h2 className="text-xl font-semibold mb-4">Latest Cars 🚗</h2>

            <div className="grid md:grid-cols-3 gap-4">
                {cars.slice(0, 6).map((car) => (
                    <div key={car._id} className="bg-white p-4 rounded shadow">
                        <h3>{car.brand} {car.model}</h3>
                        <p>₹ {car.price}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}