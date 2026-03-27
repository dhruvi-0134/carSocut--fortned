import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function ManageSellers() {

    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSellers = async () => {
        try {
            setLoading(true);
            const res = await API.get("/admin/sellers");
            setSellers(res.data.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch sellers");
        } finally {
            setLoading(false);
        }
    };

    const verifySeller = async (id) => {
        try {
            const res = await API.put(`/admin/verify-seller/${id}`);
            toast.success(res.data.message);

            setSellers((prev) =>
                prev.map((s) =>
                    s._id === id ? { ...s, verificationStatus: true } : s
                )
            );

        } catch (err) {
            toast.error("Verification failed");
        }
    };

    useEffect(() => {
        fetchSellers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <h1 className="text-2xl font-bold mb-4">
                Manage Sellers 🧑‍💼
            </h1>

            <div className="bg-white rounded-xl shadow p-4">

                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <table className="w-full">

                        <thead>
                            <tr className="border-b text-left">
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sellers.map((seller, index) => (
                                <tr key={seller._id} className="border-b">

                                    <td>{index + 1}</td>

                                    <td>{seller.userId?.fullName}</td>

                                    <td>{seller.userId?.email}</td>

                                    <td>{seller.companyName}</td>

                                    <td>
                                        {seller.verificationStatus
                                            ? "Verified"
                                            : "Pending"}
                                    </td>

                                    <td>
                                        <button
                                            onClick={() => verifySeller(seller._id)}
                                            disabled={seller.verificationStatus}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            {seller.verificationStatus
                                                ? "Verified"
                                                : "Verify"}
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                )}

            </div>

        </div>
    );
}