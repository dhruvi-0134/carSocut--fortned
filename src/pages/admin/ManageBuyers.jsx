import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function ManageUsers() {

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const res = await API.get("/admin/users");
        setUsers(res.data.data);
    };

    const blockUser = async (id) => {
        try {
            const res = await API.put(`/admin/block/${id}`);
            console.log(res.data); // 🔥 DEBUG
            fetchUsers();
        } catch (err) {
            console.log(err.response?.data); // 🔥 SEE ERROR
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>

            <h1 className="text-2xl font-bold mb-4">Users</h1>

            {users.map((user) => (
                <div key={user._id} className="flex justify-between p-3 bg-white mb-2">

                    <span>
                        {user.email}
                        {user.accountStatus === "blocked" && (
                            <span className="text-red-500 ml-2">(Blocked)</span>
                        )}
                    </span>

                    <button
                        onClick={() => blockUser(user._id)}
                        disabled={user.accountStatus === "blocked"}
                        className={`px-3 py-1 rounded text-white ${user.accountStatus === "blocked"
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                    >
                        {user.accountStatus === "blocked" ? "Blocked" : "Block"}
                    </button>

                </div>
            ))}

        </div>
    );
}