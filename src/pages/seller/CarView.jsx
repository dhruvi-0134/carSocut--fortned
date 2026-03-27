import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function CarView() {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCar = async () => {
        try {
            const res = await API.get(`/cars/get/${id}`);
            setCar(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch car details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCar();
    }, [id]);

    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (!car) return <p className="text-center mt-20">Car not found</p>;

    return (
        <div className="p-6 min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">{car.brand} {car.model}</h1>
            <p className="text-xl text-blue-600 font-semibold mb-2">₹{car.price}</p>
            <p className="text-gray-500 mb-4">{car.year} • {car.fuelType} • {car.transmission}</p>
            <p className="mb-4">{car.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {car.media && car.media.length > 0 ? (
                    car.media.map((m, index) => (
                        <img
                            key={index}
                            src={m.mediaUrl}
                            alt={`car-${index}`}
                            className="w-full h-48 object-cover rounded-xl"
                        />
                    ))
                ) : (
                    <p>No images available</p>
                )}
            </div>
        </div>
    );
}