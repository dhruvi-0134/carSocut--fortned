import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    // ❌ no token → go login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // ❌ role mismatch → go login
    if (role && userRole?.toLowerCase() !== role.toLowerCase()) {
        return <Navigate to="/login" />;
    }

    // ✅ allow access
    return children;
};