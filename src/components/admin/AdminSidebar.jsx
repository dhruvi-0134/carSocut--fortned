import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export const AdminSidebar = () => {

  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div
        className={`bg-gray-900 text-white p-5 transition-all duration-300 
        ${isOpen ? "w-64" : "w-20"}`}
      >

        {/* TOGGLE BUTTON */}
        <button
          className="mb-6 text-white text-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* LOGO */}
        {isOpen && (
          <h2 className="text-2xl font-bold mb-8 text-blue-400">
            Car Scout 🚗
          </h2>
        )}

        <ul className="space-y-4 font-medium">

          <li>
            <Link
              to="/admin/dashboard"
              className="block hover:text-blue-400"
            >
              📊 {isOpen && "Dashboard"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/manage-users"
              className="block hover:text-blue-400"
            >
              👤 {isOpen && "Manage Users"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/manage-sellers"
              className="block hover:text-blue-400"
            >
              🏢 {isOpen && "Manage Sellers"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/manage-listings"
              className="block hover:text-blue-400"
            >
              🚗 {isOpen && "Car Listings"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/inspections"
              className="block hover:text-blue-400"
            >
              📝 {isOpen && "Inspection Reports"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/negotiations"
              className="block hover:text-blue-400"
            >
              🤝 {isOpen && "Negotiations"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/transactions"
              className="block hover:text-blue-400"
            >
              💳 {isOpen && "Transactions"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/reports"
              className="block hover:text-blue-400"
            >
              📈 {isOpen && "Reports"}
            </Link>
          </li>

          <li>
            <Link
              to="/admin/settings"
              className="block hover:text-blue-400"
            >
              ⚙️ {isOpen && "Settings"}
            </Link>
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 w-full text-left"
            >
              🚪 {isOpen && "Logout"}
            </button>
          </li>

        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
};