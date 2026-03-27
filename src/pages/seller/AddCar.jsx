import { useForm } from "react-hook-form";
import API from "../../api/axios";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode"; // ✅ FIXED: default import

export default function AddCar() {

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error("Please login again");
                return;
            }

            const decoded = jwt_decode(token); // ✅ use default import

            const payload = {
                ...data,
                sellerId: decoded.sellerId // include sellerId if needed by backend
            };

            await API.post("/cars/add", payload);

            toast.success("Car added successfully 🚗");
            reset();

        } catch (err) {
            console.log(err.response?.data);
            toast.error(err.response?.data?.message || "Error adding car");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

            <div className="bg-white w-full max-w-4xl p-8 rounded-2xl shadow-lg">

                {/* Title */}
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Add New Car 🚗
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Brand */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Brand</label>
                        <input {...register("brand")}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Hyundai"
                        />
                    </div>

                    {/* Model */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Model</label>
                        <input {...register("model")}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. i20"
                        />
                    </div>

                    {/* Year */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Year</label>
                        <input type="number" {...register("year")}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Price (₹)</label>
                        <input type="number" {...register("price")}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Distance Driven */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Distance Driven (km)</label>
                        <input type="number" {...register("distanceDriven")}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    {/* Fuel Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Fuel Type</label>
                        <select {...register("fuelType")}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">Select</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="CNG">CNG</option>
                            <option value="Electric">Electric</option>
                        </select>
                    </div>

                    {/* Transmission */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Transmission</label>
                        <select {...register("transmission")}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">Select</option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                    </div>

                    {/* Color */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Color</label>
                        <input {...register("color")}
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. White"
                        />
                    </div>

                    {/* Description (Full Width) */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-600">Description</label>
                        <textarea {...register("description")}
                            rows="4"
                            className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Write car details..."
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition">
                            Add Car
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}