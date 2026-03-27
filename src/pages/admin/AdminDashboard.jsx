import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AdminDashboard() {

    const [users, setUsers] = useState([]);

    const fetchData = async () => {
        try {
            const userRes = await API.get("/admin/users");
            setUsers(userRes.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ✅ FILTER SELLERS
    const sellers = users.filter(user => user.role === "seller");

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Admin Dashboard 🛠
                </h1>
                <p className="text-gray-500">
                    Manage users and platform activity
                </p>
            </div>

            {/* ✅ STATS CARDS (FIXED) */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">

                {/* TOTAL USERS */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
                    <h2>Total Users</h2>
                    <p className="text-3xl font-bold mt-2">{users.length}</p>
                </div>

                {/* ACTIVE USERS */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-2xl shadow-lg">
                    <h2>Active Users</h2>
                    <p className="text-3xl font-bold mt-2">
                        {users.filter(u => u.status === "active").length}
                    </p>
                </div>

            </div>

            {/* MAIN GRID */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* RECENT USERS */}
                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Recent Users 👥
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">

                            <thead>
                                <tr className="text-gray-500 text-sm border-b">
                                    <th className="py-2">Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.slice(0, 5).map((user) => (
                                    <tr key={user._id} className="border-b hover:bg-gray-50">
                                        <td className="py-2">{user.fullName}</td>
                                        <td>{user.email}</td>
                                        <td className="capitalize">{user.role}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* ✅ RECENT SELLERS */}
                <div className="bg-white rounded-2xl shadow p-6">

                    <h2 className="text-xl font-semibold mb-4">
                        Recent Sellers 🧑‍💼
                    </h2>

                    <div className="space-y-3">

                        {sellers.slice(0, 5).map((seller) => (
                            <div
                                key={seller._id}
                                className="flex items-center justify-between p-3 border rounded-lg hover:shadow-md transition"
                            >
                                <div>
                                    <p className="font-semibold">
                                        {seller.fullName}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {seller.email}
                                    </p>
                                </div>

                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                    Seller
                                </span>
                            </div>
                        ))}

                        {sellers.length === 0 && (
                            <p className="text-gray-500 text-sm">
                                No sellers found
                            </p>
                        )}

                    </div>

                </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="mt-8 bg-white rounded-2xl shadow p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Quick Actions ⚡
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                    {/* ❌ ADD CAR REMOVED */}

                    <button className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                        Manage Users
                    </button>

                    <button className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">
                        View Reports
                    </button>

                    <button className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                        Delete Listings
                    </button>

                </div>

            </div>

        </div>
    );
}