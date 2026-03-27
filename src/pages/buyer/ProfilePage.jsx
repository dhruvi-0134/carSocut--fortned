import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function BuyerProfile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const [editMode, setEditMode] = useState(false);
    const [fullName, setFullName] = useState("");
    const [profilePic, setProfilePic] = useState("");

    // ✅ Fetch Profile
    const fetchProfile = async () => {
        try {
            const res = await API.get("/user/profile");

            // ✅ FIX
            setUser(res.data.data.user);

        } catch (err) {
            console.log("PROFILE ERROR:", err);
            toast.error(err.response?.data?.message || "Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    // ✅ Set values when user loads
    useEffect(() => {
        if (user) {
            setFullName(user.fullName || "");
            setProfilePic(user.profilepicture || "");
        }
    }, [user]);

    // ✅ Image Upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfilePic(reader.result);
        };

        reader.readAsDataURL(file);
    };

    // ✅ Save Profile
    const handleSave = async () => {
        try {
            const res = await API.put("/user/profile", {
                fullName,
                profilepicture: profilePic
            });

            // ✅ FIX
            setUser(res.data.data.user);

            setEditMode(false);
            toast.success("Profile updated successfully");

        } catch (err) {
            console.log("UPDATE ERROR:", err);
            toast.error(err.response?.data?.message || "Update failed");
        }
    };

    // ✅ Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");

        window.location.href = "/login";
    };

    // ✅ Loading state
    if (loading) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    // ✅ ERROR SAFE UI (IMPORTANT FIX)
    if (!user) {
        return (
            <div className="text-center mt-10 text-red-500">
                Failed to load profile. Please login again.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6 flex justify-center items-center">

            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl p-8">

                {/* PROFILE HEADER */}
                <div className="flex items-center gap-6 border-b pb-6">

                    <div className="flex flex-col items-center">
                        <img
                            src={
                                profilePic ||
                                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            }
                            alt="profile"
                            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
                        />

                        {editMode && (
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="mt-2 text-sm"
                            />
                        )}
                    </div>

                    <div className="flex-1">

                        {editMode ? (
                            <input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        ) : (
                            <h2 className="text-2xl font-bold text-gray-800">
                                {user.fullName}
                            </h2>
                        )}

                        <p className="text-gray-500 mt-1">{user.email}</p>

                        <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                            {user.role}
                        </span>
                    </div>

                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <p className="text-gray-500 text-sm">Full Name</p>
                        <p className="font-semibold">{user.fullName}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <p className="text-gray-500 text-sm">Email</p>
                        <p className="font-semibold">{user.email}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <p className="text-gray-500 text-sm">Account Status</p>
                        <p className="font-semibold capitalize">
                            {user.status || "active"}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
                        <p className="text-gray-500 text-sm">User ID</p>
                        <p className="font-semibold text-sm">{user._id}</p>
                    </div>

                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-4 mt-8">

                    {!editMode ? (
                        <button
                            onClick={() => setEditMode(true)}
                            className="bg-yellow-500 text-white px-5 py-2 rounded-xl hover:bg-yellow-600"
                        >
                            Edit Profile
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600"
                        >
                            Save
                        </button>
                    )}

                    <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
                    >
                        Logout
                    </button>

                </div>

            </div>

        </div>
    );
}