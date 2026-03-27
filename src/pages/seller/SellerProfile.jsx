import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function SellerProfile() {

    const [user, setUser] = useState(null);
    const [seller, setSeller] = useState(null);
    const [loading, setLoading] = useState(true);

    const [editMode, setEditMode] = useState(false);
    const [fullName, setFullName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [sellerType, setSellerType] = useState("");

    // ✅ FETCH BOTH USER + SELLER
    const fetchProfile = async () => {
        try {
            const res = await API.get("/user/profile");

            setUser(res.data.data.user);
            setSeller(res.data.data.seller);

        } catch (err) {
            toast.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // ✅ SET DATA
    useEffect(() => {
        if (user && seller) {
            setFullName(user.fullName || "");
            setCompanyName(seller.companyName || "");
            setSellerType(seller.sellerType || "");
        }
    }, [user, seller]);

    // ✅ SAVE PROFILE
    const handleSave = async () => {
        try {
            const res = await API.put("/user/profile", {
                fullName,
                companyName,
                sellerType
            });

            setUser(res.data.data.user);
            setSeller(res.data.data.seller);

            setEditMode(false);
            toast.success("Profile updated 🚀");

        } catch (err) {
            toast.error("Update failed");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 p-6 flex justify-center items-center">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8">

                {/* HEADER */}
                <div className="flex items-center gap-6 border-b pb-6">

                    <div className="w-28 h-28 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                        {user?.fullName?.charAt(0)}
                    </div>

                    <div className="flex-1">

                        {editMode ? (
                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        ) : (
                            <h2 className="text-3xl font-bold text-gray-800">
                                {user?.fullName}
                            </h2>
                        )}

                        <p className="text-gray-500">{user?.email}</p>

                        <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                            Seller
                        </span>

                    </div>
                </div>

                {/* SELLER DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                    {/* COMPANY */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-xl shadow">
                        <p className="text-gray-500 text-sm">Company Name</p>

                        {editMode ? (
                            <input
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="border p-2 rounded w-full mt-2"
                            />
                        ) : (
                            <p className="font-bold text-lg mt-1">{companyName}</p>
                        )}
                    </div>

                    {/* SELLER TYPE */}
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-xl shadow">
                        <p className="text-gray-500 text-sm">Seller Type</p>

                        {editMode ? (
                            <select
                                value={sellerType}
                                onChange={(e) => setSellerType(e.target.value)}
                                className="border p-2 rounded w-full mt-2"
                            >
                                <option value="dealer">Dealer</option>
                                <option value="individual">Individual</option>
                            </select>
                        ) : (
                            <p className="font-bold text-lg mt-1 capitalize">
                                {sellerType}
                            </p>
                        )}
                    </div>

                    {/* STATUS */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-xl shadow">
                        <p className="text-gray-500 text-sm">Verification</p>
                        <p className="font-bold text-lg mt-1">
                            {seller?.verificationStatus ? "Verified ✅" : "Pending ⏳"}
                        </p>
                    </div>

                    {/* USER ID */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-xl shadow">
                        <p className="text-gray-500 text-sm">User ID</p>
                        <p className="font-bold text-sm mt-1">{user?._id}</p>
                    </div>

                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-4 mt-8">

                    {!editMode ? (
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-yellow-500 text-white px-6 py-2 rounded-xl hover:bg-yellow-600"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600"
                        >
                            Save Changes
                        </button>
                    )}

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}