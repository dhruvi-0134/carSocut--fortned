import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function CarEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState({
        brand: "",
        model: "",
        price: "",
        year: "",
        fuelType: "",
        transmission: "",
        description: ""
    });
    const [loading, setLoading] = useState(true);

    // Fetch car details
    const fetchCar = async () => {
        try {
            const res = await API.get(`/cars/get/${id}`);
            setCar(res.data.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch car");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCar();
    }, [id]);

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/cars/update/${id}`, car);
            toast.success("Car updated successfully");
            navigate("/mycars"); // Redirect to MyCars
        } catch (err) {
            console.error(err);
            toast.error("Update failed");
        }
    };

    if (loading) return <p className="text-center mt-20">Loading...</p>;

    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
            <h1 className="text-2xl font-bold mb-4">Edit Car</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {["brand", "model", "price", "year", "fuelType", "transmission", "description"].map((field) => (
                    <input
                        key={field}
                        name={field}
                        value={car[field]}
                        onChange={handleChange}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="w-full p-2 border rounded"
                        required
                    />
                ))}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Update Car
                </button>
            </form>
        </div>
    );
}