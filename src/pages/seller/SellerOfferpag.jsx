import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

function SellerOfferPage() {
    const [cars, setCars] = useState([]);
    const [selectedCarId, setSelectedCarId] = useState("");
    const [selectedCar, setSelectedCar] = useState(null);
    const [offerPrice, setOfferPrice] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem("user"));

                if (!storedUser?._id) {
                    toast.error("User not found");
                    return;
                }

                const res = await API.get(`/cars/seller/${storedUser._id}`);
                setCars(res.data?.data || []);

            } catch (err) {
                console.error(err);
                toast.error("Failed to load cars");
            }
        };

        fetchCars();
    }, []);

    const filteredCars = cars.filter((car) =>
        `${car.brand} ${car.model}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedCar || !offerPrice) {
            toast.error("Select car and enter price");
            return;
        }

        try {
            const user = JSON.parse(localStorage.getItem("user"));

            let sellerId = selectedCar.sellerId;
            if (typeof sellerId === "object") {
                sellerId = sellerId._id;
            }

            const payload = {
                buyerId: "69bcbd46fdb10361a6061824", // ✅ FIX
                carId: selectedCar._id,
                sellerId: sellerId,
                offeredPrice: Number(offerPrice),
            };

            await API.post("/offers/add", payload);

            toast.success("Offer sent successfully!");

            setSelectedCarId("");
            setSelectedCar(null);
            setOfferPrice("");

        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Error creating offer");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-6">Create a New Offer</h1>

            <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search car..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full mb-4 border p-3 rounded-lg"
                />

                {/* Car Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCars.length > 0 ? (
                        filteredCars.map((car) => (
                            <div
                                key={car._id}
                                onClick={() => {
                                    setSelectedCarId(car._id);
                                    setSelectedCar(car);
                                }}
                                className={`cursor-pointer border rounded-xl p-4 shadow hover:shadow-lg transition 
                                ${selectedCarId === car._id
                                        ? "border-blue-600 bg-blue-50"
                                        : "bg-white"
                                    }`}
                            >
                                {/* ✅ FIXED IMAGE */}
                                {car.media?.length > 0 ? (
                                    <img
                                        src={
                                            car.media[0].mediaUrl.startsWith("http")
                                                ? car.media[0].mediaUrl
                                                : `http://localhost:5000/${car.media[0].mediaUrl}`
                                        }
                                        alt="car"
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                ) : (
                                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                                        No Image
                                    </div>
                                )}

                                <h2 className="text-lg font-bold mt-2">
                                    {car.brand} {car.model} ({car.year})
                                </h2>

                                <p className="text-sm text-gray-600">
                                    {car.fuelType} • {car.transmission}
                                </p>

                                <p className="text-sm text-gray-600">
                                    {car.distanceDriven} km • {car.color}
                                </p>

                                <p className="text-blue-600 font-semibold mt-1">
                                    ₹{car.price.toLocaleString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No cars found</p>
                    )}
                </div>

                {/* Selected Car */}
                {selectedCar && (
                    <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                        <h2 className="text-xl font-bold">
                            {selectedCar.brand} {selectedCar.model} ({selectedCar.year})
                        </h2>
                        <p>Fuel: {selectedCar.fuelType}</p>
                        <p>Transmission: {selectedCar.transmission}</p>
                        <p>Color: {selectedCar.color}</p>
                        <p>KM: {selectedCar.distanceDriven}</p>
                        <p>Price: ₹{selectedCar.price.toLocaleString()}</p>
                    </div>
                )}

                {/* Offer Form */}
                {selectedCar && (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <input
                            type="number"
                            placeholder="Enter offer price"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            className="w-full border p-3 rounded-lg"
                        />

                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
                            Send Offer
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default SellerOfferPage;