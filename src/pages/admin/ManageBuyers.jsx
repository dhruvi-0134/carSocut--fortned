import { useEffect, useState } from "react";
import API from "../../api/axios";
import { toast } from "react-toastify";

export default function ManageUsers() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            const res = await API.get("/admin/users");
            setUsers(res.data.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch users");
        }
    };

    // ✅ BLOCK / UNBLOCK USER
    const toggleBlockUser = async (id, currentStatus) => {
        try {
            setLoading(true);

            const endpoint =
                currentStatus === "blocked"
                    ? `/admin/unblock/${id}`
                    : `/admin/block/${id}`;

            const res = await API.put(endpoint);

            toast.success(res.data.message || "Updated successfully");

            // ✅ UPDATE UI WITHOUT REFRESH
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === id
                        ? {
                            ...user,
                            accountStatus:
                                currentStatus === "blocked"
                                    ? "active"
                                    : "blocked",
                        }
                        : user
                )
            );

        } catch (err) {
            console.log(err.response?.data);
            toast.error(err.response?.data?.message || "Action failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            {/* HEADER */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Manage Users 👥
                </h1>
                <p className="text-gray-500">
                    View, block and manage users
                </p>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-2xl shadow p-6 overflow-x-auto">

                <table className="w-full text-left">

                    <thead>
                        <tr className="border-b text-gray-500 text-sm">
                            <th className="py-3">#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr
                                key={user._id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="py-3">{index + 1}</td>

                                <td className="font-medium">
                                    {user.fullName || "N/A"}
                                </td>

                                <td className="text-gray-600">
                                    {user.email}
                                </td>

                                <td className="capitalize">
                                    {user.role}
                                </td>

                                {/* STATUS */}
                                <td>
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full font-medium ${user.accountStatus === "blocked"
                                            ? "bg-red-100 text-red-600"
                                            : "bg-green-100 text-green-600"
                                            }`}
                                    >
                                        {user.accountStatus === "blocked"
                                            ? "Blocked"
                                            : "Active"}
                                    </span>
                                </td>

                                {/* ACTION */}
                                <td className="text-center">
                                    <button
                                        onClick={() =>
                                            toggleBlockUser(
                                                user._id,
                                                user.accountStatus
                                            )
                                        }
                                        disabled={loading}
                                        className={`px-4 py-1.5 rounded-lg text-white text-sm ${user.accountStatus === "blocked"
                                            ? "bg-green-500 hover:bg-green-600"
                                            : "bg-red-500 hover:bg-red-600"
                                            }`}
                                    >
                                        {user.accountStatus === "blocked"
                                            ? "Unblock"
                                            : "Block"}
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

                {/* EMPTY */}
                {users.length === 0 && (
                    <p className="text-center text-gray-500 py-6">
                        No users found
                    </p>
                )}

            </div>

        </div>
    );
}