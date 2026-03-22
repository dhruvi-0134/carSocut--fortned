import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ✅ Home (inside seller folder)
import { Home } from "../pages/HomePage";

// ✅ Auth
import Login from "../components/Login";
import Signup from "../components/Signup";

// ✅ Layouts / Navbars
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { SellerNavbar } from "../components/seller/SellerNavbar";
import { BuyerNavbar } from "../components/buyer/Buyernavbar";

// ✅ Protected Route
import { ProtectedRoute } from "./ProtectedRoutes";

// ✅ Buyer Pages (your folder is "buyer", NOT "users")
import UserDashboard from "../pages/buyer/UserDashboard";
import BrowseCars from "../pages/buyer/BrowseCar";
import TestDrive from "../pages/buyer/TestDrive";


// ✅ Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageBuyers";

// ✅ Seller Pages
import SellerDashboard from "../pages/seller/SellerDashboard";
import AddCar from "../pages/seller/AddCar";
import CarDetails from "../pages/buyer/Cardetails";
import SavedCars from "../pages/buyer/SavedCars";


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },

  // ✅ Buyer Routes
  {
    path: "/buyer",
    element: (
      <ProtectedRoute role="buyer">
        <BuyerNavbar />
      </ProtectedRoute>
    ),

    children: [
      { path: "dashboard", element: <UserDashboard /> },
      { path: "browsecars", element: <BrowseCars /> },
      { path: "testdrive/:id", element: <TestDrive /> },
      { path: "saved-cars", element: <SavedCars /> },
      { path: "car/:id", element: <CarDetails /> }
    ],
  },

  // ✅ Admin Routes
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminSidebar />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "manage-users", element: <ManageUsers /> },
    ],
  },

  // ✅ Seller Routes
  {
    path: "/seller",
    element: (
      <ProtectedRoute role="seller">
        <SellerNavbar />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <SellerDashboard /> },
      { path: "addcar", element: <AddCar /> },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;