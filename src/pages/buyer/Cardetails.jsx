import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function CarDetailed() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [car, setCar] = useState(null);
    const [index, setIndex] = useState(0);

    // ✅ FIX: depend on id
    useEffect(() => {
        if (id) fetchCar();
    }, [id]);

    const fetchCar = async () => {
        try {
            const res = await API.get(`/cars/get/${id}`);
            setCar(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    if (!car) return <p className="text-center mt-10">Loading...</p>;

    const images = car.media || [];

    const nextImage = () => {
        if (images.length === 0) return;
        setIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        if (images.length === 0) return;
        setIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-blue-600"
            >
                ← Back
            </button>

            <div className="bg-white p-6 rounded-xl shadow grid md:grid-cols-2 gap-6">

                {/* ================= IMAGE SLIDER ================= */}
                <div>

                    <div className="relative">
                        <img
                            src={images[index]?.mediaUrl || "/no-image.png"}
                            alt="car"
                            className="w-full h-80 object-cover rounded"
                        />

                        {/* LEFT */}
                        <button
                            onClick={prevImage}
                            className="absolute top-1/2 left-2 -translate-y-1/2 
                            bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
                        >
                            ❮
                        </button>

                        {/* RIGHT */}
                        <button
                            onClick={nextImage}
                            className="absolute top-1/2 right-2 -translate-y-1/2 
                            bg-black bg-opacity-50 text-white px-3 py-2 rounded-full"
                        >
                            ❯
                        </button>
                    </div>

                    {/* DOTS */}
                    <div className="flex justify-center mt-3 gap-2">
                        {images.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`w-3 h-3 rounded-full cursor-pointer ${index === i ? "bg-blue-500" : "bg-gray-300"
                                    }`}
                            ></div>
                        ))}
                    </div>

                    {/* THUMBNAILS */}
                    <div className="flex gap-2 mt-4">
                        {images.map((img, i) => (
                            <img
                                key={i}
                                src={img.mediaUrl}
                                alt="thumb"
                                onClick={() => setIndex(i)}
                                className={`w-20 h-16 object-cover rounded cursor-pointer border-2 ${index === i ? "border-blue-500" : ""
                                    }`}
                            />
                        ))}
                    </div>

                </div>

                {/* ================= DETAILS ================= */}
                <div>
                    <h2 className="text-2xl font-bold">
                        {car.brand} {car.model}
                    </h2>

                    <p className="text-green-600 text-xl mt-2">
                        ₹ {car.price}
                    </p>

                    <p className="text-gray-600 mt-2">
                        {car.fuelType} | {car.transmission}
                    </p>

                    <p className="mt-2">Year: {car.year}</p>
                    <p>Distance: {car.distanceDriven} km</p>

                    <div className="flex gap-4 mt-6">

                        {/* ✅ FIXED BUTTON */}
                        <button
                            onClick={() =>
                                navigate(`/buyer/testdrive/${car._id}`)
                            }
                            className="bg-blue-500 text-white px-5 py-2 rounded"
                        >
                            Book Test Drive
                        </button>

                        <button
                            onClick={() =>
                                navigate("/buyer/transaction", {
                                    state: { carId: car._id },
                                })
                            }
                            className="bg-green-500 text-white px-5 py-2 rounded"
                        >
                            Buy Now
                        </button>

                    </div>

                </div>

            </div>
        </div>
    );
}