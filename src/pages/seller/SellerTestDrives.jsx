import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import jwt_decode from "jwt-decode"; // ✅ FIXED: default import
import { toast } from "react-toastify";

export default function SellerTestDrives() {
    const [drives, setDrives] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");
    const decoded = token ? jwt_decode(token) : null; // ✅ use default import

    // Fetch test drives assigned to this seller
    const fetchDrives = async () => {
        try {
            const res = await API.get("/testdrives/get");
            const allDrives = res.data.data;

            // Filter drives for this seller
            const myDrives = allDrives.filter((drive) => {
                if (!drive.sellerId) return false;
                const sellerId =
                    typeof drive.sellerId === "object"
                        ? drive.sellerId._id
                        : drive.sellerId;
                return sellerId?.toString() === decoded?.sellerId;
            });

            setDrives(myDrives);
        } catch (err) {
            console.log("Fetch drives error:", err);
            toast.error("Failed to load test drives");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (decoded?.id) fetchDrives();
    }, [decoded]);

    // Action buttons: Approve / Reject / Complete / Pending
    const updateStatus = async (id, status) => {
        try {
            await API.put(`/testdrives/update/${id}`, { status });
            toast.success(`Test drive marked ${status}`);
            fetchDrives();
        } catch (err) {
            console.log("Update status error:", err);
            toast.error("Update failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Test Drive Requests 🚗
            </h1>

            {loading ? (
                <p>Loading...</p>
            ) : drives.length === 0 ? (
                <p>No test drive requests yet</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {drives.map((drive) => (
                        <div key={drive._id} className="bg-white p-5 rounded shadow">
                            <h2 className="text-xl font-bold">
                                {drive.carId?.brand} {drive.carId?.model}
                            </h2>

                            <p>👤 Buyer: {drive.buyerId?.name}</p>
                            <p>📅 Date: {new Date(drive.testDriveDate).toLocaleString()}</p>

                            <div className="mt-4 flex flex-wrap gap-2 items-center">
                                <span
                                    className={`px-3 py-1 rounded font-semibold ${drive.status === "approved"
                                        ? "bg-blue-100 text-blue-600"
                                        : drive.status === "rejected"
                                            ? "bg-red-100 text-red-600"
                                            : drive.status === "completed"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-yellow-100 text-yellow-600"
                                        }`}
                                >
                                    {drive.status || "pending"}
                                </span>

                                {/* Show action buttons only if not completed/rejected */}
                                {drive.status !== "completed" && drive.status !== "rejected" && (
                                    <div className="flex gap-2 mt-2">
                                        <button
                                            onClick={() => updateStatus(drive._id, "approved")}
                                            className="bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(drive._id, "rejected")}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Reject
                                        </button>
                                        <button
                                            onClick={() => updateStatus(drive._id, "completed")}
                                            className="bg-green-600 text-white px-3 py-1 rounded"
                                        >
                                            Complete
                                        </button>
                                        <button
                                            onClick={() => updateStatus(drive._id, "pending")}
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Pending
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}