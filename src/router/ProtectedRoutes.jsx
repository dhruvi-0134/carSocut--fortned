import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ role }) => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    const location = useLocation();

    // ❌ NO TOKEN OR INVALID TOKEN
    if (!token || token === "undefined" || token === "null") {
        localStorage.clear(); // 🔥 IMPORTANT
        return (
            <Navigate
                to="/login"
                state={{ redirectTo: location.pathname }}
                replace
            />
        );
    }

    // ❌ ROLE MISMATCH
    if (role && role !== userRole) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};