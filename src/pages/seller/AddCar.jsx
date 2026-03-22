import { useForm } from "react-hook-form";
import API from "../../api/axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // 👈 ADD THIS

export default function AddCar() {

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {

            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login again");
                return;
            }

            const decoded = jwtDecode(token);

            const payload = {
                ...data,
                sellerId: decoded._id   // ✅ FIXED
            };

            await API.post("/cars/add", payload);

            toast.success("Car added successfully 🚗");

        } catch (err) {
            console.log(err.response?.data); // 🔥 IMPORTANT DEBUG
            toast.error(err.response?.data?.message || "Error adding car");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <input {...register("brand")} placeholder="Brand" />
            <input {...register("model")} placeholder="Model" />
            <input {...register("year")} placeholder="Year" />
            <input {...register("price")} placeholder="Price" />
            <input {...register("distanceDriven")} placeholder="Distance Driven" />
            <input {...register("fuelType")} placeholder="Fuel Type" />
            <input {...register("transmission")} placeholder="Transmission" />
            <input {...register("color")} placeholder="Color" />
            <input {...register("description")} placeholder="Description" />

            <button className="bg-blue-500 text-white px-4 py-2">
                Add Car
            </button>

        </form>
    );
}