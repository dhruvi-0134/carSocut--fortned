import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/user/login", data);

      if (res.status === 200) {
        const token = res.data.token;
        const role = res.data.role;
        const user = res.data.user;

        const minimalUser = {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        };

        localStorage.clear();

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("user", JSON.stringify(minimalUser));

        toast.success("Login Success");

        const redirectTo = location.state?.redirectTo;

        if (role === "buyer") {
          navigate(redirectTo || "/buyer/dashboard");
        } else if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "seller") {
          navigate("/seller/dashboard");
        } else {
          toast.error("Invalid Role");
        }
      }

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex w-[900px]">

        {/* LEFT IMAGE */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            alt="Car"
            className="h-full w-full object-cover"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to <span className="text-blue-600">CarScout</span>
          </h2>

          <p className="text-gray-500 mb-8">
            Login to explore your dream cars 🚗
          </p>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>

            {/* ✅ FIXED FORGOT PASSWORD */}
            <p className="text-right mt-2">
              <Link to="/forgotpassword" className="text-blue-500 text-sm hover:underline">
                Forgot Password?
              </Link>
            </p>

          </form>

          {/* SIGNUP */}
          <p className="text-sm text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;