import React, { useEffect, useState } from "react";
import API from "../../api/axios";

export default function AdminDashboard() {

    const [users, setUsers] = useState([]);
    const [listings, setListings] = useState([]);

    const fetchData = async () => {
        try {
            const userRes = await API.get("/admin/users");
            const listingRes = await API.get("/admin/listings");

            setUsers(userRes.data.data);
            setListings(listingRes.data.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>

            <h1 className="text-2xl font-bold mb-6">Admin Dashboard 🛠</h1>

            {/* STATS */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white p-6 rounded shadow">
                    <h2>Total Users</h2>
                    <p className="text-2xl">{users.length}</p>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h2>Total Listings</h2>
                    <p className="text-2xl">{listings.length}</p>
                </div>

            </div>

            {/* USERS */}
            <h2 className="text-xl font-semibold mb-4">Recent Users</h2>

            {users.slice(0, 5).map((user) => (
                <div key={user._id} className="bg-white p-3 mb-2 rounded shadow">
                    {user.email}
                </div>
            ))}

        </div>
    );
}