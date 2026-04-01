import { createBrowserRouter, RouterProvider } from "react-router-dom";

// ✅ correct
import Home from "../pages/HomePage";

import Login from "../components/Login";
import Signup from "../components/Signup";

// Layouts
import { BuyerNavbar } from "../components/buyer/Buyernavbar";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import SellerNavbar from "../components/seller/Sellernavbar";

// Protected
import { ProtectedRoute } from "./ProtectedRoutes";

// Buyer Pages
import UserDashboard from "../pages/buyer/UserDashboard";
import TestDrive from "../pages/buyer/TestDrive";
import SavedCars from "../pages/buyer/SavedCars";
import BuyerProfile from "../pages/buyer/ProfilePage";
import BuyerNegotiations from "../pages/buyer/BuyerNegotiations";
import BrowseCars from "../pages/buyer/BrowseCars";
import CarDetailed from "../pages/buyer/Cardetails";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageBuyers";
import ManageSellers from "../pages/admin/ManageSeller";

// Seller Pages
import SellerDashboard from "../pages/seller/SellerDashboard";
import AddCar from "../pages/seller/AddCar";
import MyCars from "../pages/seller/MyCars";
import SellerTestDrives from "../pages/seller/SellerTestDrives";
import SellerOfferPage from "../pages/seller/SellerOfferpag";
import SellerProfile from "../pages/seller/SellerProfile";

// Auth
import { Forgotpassword } from "../components/Forgotpassword";
import ResetPassword from "../components/ResetPassword";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },

  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgotpassword", element: <Forgotpassword /> },
  { path: "/resetpassword/:token", element: <ResetPassword /> },

  // ✅ BUYER
  {
    path: "/buyer",
    element: <ProtectedRoute role="buyer" />,
    children: [
      {
        element: <BuyerNavbar />,
        children: [
          { index: true, element: <UserDashboard /> }, // ✅ ADD THIS
          { path: "dashboard", element: <UserDashboard /> },
          { path: "browsecars", element: <BrowseCars /> },
          { path: "saved-cars", element: <SavedCars /> },
          { path: "profile", element: <BuyerProfile /> },
          { path: "car/:id", element: <CarDetailed /> },
          { path: "testdrive/:id", element: <TestDrive /> },
          { path: "negotiations", element: <BuyerNegotiations /> }
        ]
      }
    ]
  },

  // ✅ ADMIN
  {
    path: "/admin",
    element: <ProtectedRoute role="admin" />,
    children: [
      {
        element: <AdminSidebar />,
        children: [
          { index: true, element: <AdminDashboard /> }, // ✅ ADD THIS
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-sellers", element: <ManageSellers /> }
        ]
      }
    ]
  },

  // ✅ SELLER
  {
    path: "/seller",
    element: <ProtectedRoute role="seller" />,
    children: [
      {
        element: <SellerNavbar />,
        children: [
          { index: true, element: <SellerDashboard /> }, // ✅ ADD THIS
          { path: "dashboard", element: <SellerDashboard /> },
          { path: "addcar", element: <AddCar /> },
          { path: "mycars", element: <MyCars /> },
          { path: "testdrives", element: <SellerTestDrives /> },
          { path: "offers", element: <SellerOfferPage /> },
          { path: "profile", element: <SellerProfile /> }
        ]
      }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;