import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import { Home } from "../pages/HomePage";
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


// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageBuyers";

// Seller Pages
import SellerDashboard from "../pages/seller/SellerDashboard";
import AddCar from "../pages/seller/AddCar";
import MyCars from "../pages/seller/MyCars";

import BrowseCars from "../pages/buyer/BrowseCars";
import CarDetailed from "../pages/buyer/Cardetails";

import SellerTestDrives from "../pages/seller/SellerTestDrives";
import BuyerProfile from "../pages/buyer/ProfilePage";
import SellerOfferPage from "../pages/seller/SellerOfferpag";
import BuyerNegotiations from "../pages/buyer/BuyerNegotiations";
import { Forgotpassword } from "../components/Forgotpassword";
import ResetPassword from "../components/ResetPassword";
import SellerProfile from "../pages/seller/SellerProfile";
import ManageSellers from "../pages/admin/ManageSeller";
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgotpassword", element: <Forgotpassword /> },
  { path: "/resetpassword/:token", element: <ResetPassword /> },

  // public car details (optional)

  // ✅ BUYER ROUTES (FIXED)
  {
    path: "/buyer",
    element: <ProtectedRoute role="buyer" />,
    children: [
      {
        element: <BuyerNavbar />,
        children: [
          // 🔥 ADD THIS
          { path: "dashboard", element: <UserDashboard /> },

          { path: "browsecars", element: <BrowseCars /> },
          { path: "saved-cars", element: <SavedCars /> },
          { path: "profile", element: <BuyerProfile /> },
          // 🔥 ADD THIS (MAIN ERROR FIX)
          { path: "car/:id", element: <CarDetailed /> },

          { path: "testdrive/:id", element: <TestDrive /> },
          { path: "negotiations", element: <BuyerNegotiations /> }
        ]
      }
    ]
  },

  // ADMIN
  {
    path: "/admin",
    element: <ProtectedRoute role="admin" />,
    children: [
      {
        element: <AdminSidebar />,
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "manage-sellers", element: <ManageSellers /> }
        ]
      }
    ]
  },

  // SELLER
  {
    path: "/seller",
    element: <ProtectedRoute role="seller" />,
    children: [
      {
        element: <SellerNavbar />,
        children: [
          { path: "dashboard", element: <SellerDashboard /> },
          { path: "addcar", element: <AddCar /> },
          { path: "mycars", element: <MyCars /> },
          { path: "testdrives", element: < SellerTestDrives s /> },
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