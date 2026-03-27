import { useEffect, useState } from "react";
import API from "../../api/axios";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

export default function MyCars() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch seller's cars
    const fetchCars = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login again");
                setLoading(false);
                return;
            }

            // Decode JWT to get user ID
            const decoded = jwt_decode(token);
            const userId = decoded.id; // backend uses userId to find seller

            if (!userId) {
                toast.error("Invalid token");
                setLoading(false);
                return;
            }

            // Fetch cars by seller
            const res = await API.get(`/cars/seller/${userId}`);
            const myCars = res.data.data || [];

            setCars(myCars);
        } catch (err) {
            console.error("Fetch cars error:", err);
            toast.error("Failed to fetch cars");
        } finally {
            setLoading(false);
        }
    };

    // Delete a car
    const handleDelete = async (id) => {
        try {
            await API.delete(`/cars/delete/${id}`);
            toast.success("Car deleted successfully");
            fetchCars(); // refresh after deletion
        } catch (err) {
            console.error("Delete error:", err);
            toast.error("Delete failed");
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Cars 🚗</h1>
            </div>

            {loading && <p className="text-center text-gray-500">Loading cars...</p>}

            {!loading && cars.length === 0 && (
                <div className="text-center mt-20">
                    <h2 className="text-xl font-semibold text-gray-600">
                        No cars added yet 🚫
                    </h2>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cars.map((car) => (
                    <div key={car._id} className="bg-white rounded-2xl shadow p-4">
                        {car.media && car.media.length > 0 ? (
                            <img
                                src={car.media[0].mediaUrl}
                                alt={car.model}
                                className="w-full h-48 object-cover rounded-xl mb-4"
                            />
                        ) : (
                            <img
                                src="https://via.placeholder.com/400x300?text=No+Image"
                                alt="No Car Image"
                                className="w-full h-48 object-cover rounded-xl mb-4"
                            />
                        )}

                        <h2 className="text-lg font-bold">
                            {car.brand} {car.model}
                        </h2>
                        <p className="text-blue-600 font-semibold">₹{car.price}</p>
                        <p className="text-sm text-gray-500">
                            {car.year} • {car.fuelType} • {car.transmission}
                        </p>

                        <div className="flex justify-between mt-4">
                            <button
                                className="text-blue-600"
                                onClick={() => window.open(`/cars/view/${car._id}`, "_blank")}
                            >
                                View
                            </button>

                            <button
                                className="text-yellow-600"
                                onClick={() =>
                                    (window.location.href = `/cars/edit/${car._id}`)
                                }
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(car._id)}
                                className="text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}