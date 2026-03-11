import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { UserNavbar } from "../components/user/UserNavbar";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { CarList } from "../components/user/CarList";
import { CarDetail } from "../components/user/CarDetail";
import { AllUserList } from "../components/admin/AllUserList";
import { GetApiDemo } from "../components/user/GetApiDemo";
import { UseEffectDemo } from "../components/user/UseEffectDemo";
import { BuyerNavbar } from "../components/buyer/Buyernavbar";

const router = createBrowserRouter([
    {path:"/",element:<Login/>},
    {path:"/signup",element:<Signup/>},

    {path:"/user",element:<UserNavbar/>,
        children:[
            {path:"carlist",element:<CarList/>},
            {path:"cardetail",element:<CarDetail/>},
            {path:"getapidemo1",element:<GetApiDemo/>},
            {path:"useeffectdemo",element:<UseEffectDemo/>}
        ]
    },
       {
    path: "/admin",
    element: <AdminSidebar />,
    children: [
      { path: "dashboard", element: <h1>Admin Dashboard</h1> },
      { path: "buyers", element: <h1>Manage Buyers</h1> },
      { path: "sellers", element: <h1>Manage Sellers</h1> },
      { path: "cars", element: <h1>Manage Cars</h1> },
      { path: "approve-cars", element: <h1>Approve Car Listings</h1> },
      { path: "reports", element: <h1>Inspection Reports</h1> },
      { path: "payments", element: <h1>Payments</h1> },
      { path: "disputes", element: <h1>Disputes</h1> },
      { path: "analytics", element: <h1>Analytics</h1> },
      { path: "settings", element: <h1>Settings</h1> },
    ],
  },
  {
    path:"/buyernavbar", element:<BuyerNavbar/>,
    children: [
    { path: "carlist", element: <CarList /> },
    { path: "compare", element: <h1>Compare Cars</h1> },
    { path: "saved", element: <h1>Saved Cars</h1> },
    { path: "testdrives", element: <h1>Test Drives</h1> },
    { path: "financing", element: <h1>Financing</h1> },
    { path: "messages", element: <h1>Messages</h1> }
  ]
  }
    
])

const AppRouter = ()=>{
    return <RouterProvider router={router}></RouterProvider>
}
export default AppRouter