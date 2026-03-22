import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function TestDrive() {
    const { id } = useParams(); // ✅ carId
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    const fetchCar = async () => {
        try {
            const res = await API.get(`/cars/get/${id}`); // ✅ FIXED
            setCar(res.data.data);
        } catch (err) {
            console.log(err);
            toast.error("Car not found");
        }
    };

    useEffect(() => {
        if (id) fetchCar(); // ✅ prevent undefined
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("USER =", user);
        console.log("CAR =", car);
        console.log("SELLER =", car?.sellerId);
        if (!date || !time) {
            return toast.error("Select date & time");
        }

        if (!car) {
            return toast.error("Car not loaded");
        }

        try {
            const testDriveDate = new Date(`${date}T${time}`);

            await API.post("/testdrive/add", {
                buyerId: user?._id,
                sellerId: car?.sellerId?._id || car?.sellerId,
                carId: car?._id,
                testDriveDate
            });

            toast.success("Booked successfully 🚗");
            navigate("/buyer/dashboard");

        } catch (err) {
            console.log(err);
            toast.error(err?.response?.data?.message || "Failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">

                <h2 className="text-xl font-bold text-center mb-4">
                    Book Test Drive
                </h2>

                {car && (
                    <div className="mb-4">
                        <img
                            src={car.media?.[0]?.mediaUrl}
                            className="h-40 w-full object-cover rounded"
                        />
                        <h3 className="font-bold mt-2">
                            {car.brand} {car.model}
                        </h3>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">

                    <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <input
                        type="time"
                        className="w-full border p-2 rounded"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />

                    <button className="bg-blue-600 text-white w-full py-2 rounded">
                        Book Now
                    </button>

                </form>

            </div>
        </div>
    );
}