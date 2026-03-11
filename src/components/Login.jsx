import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const submitHandler = (data) => {

    // get saved user from localStorage
    const savedUser = JSON.parse(localStorage.getItem("carScoutUser"));

    // check if user exists
    if (!savedUser) {
      toast.error("No user found. Please signup first.");
      return;
    }

    // check email and password
    if (data.email === savedUser.email && data.password === savedUser.password) {
      toast.success("Login Successful 🚗");
      navigate("/buyernavbar");
    } else {
      toast.error("Invalid Email or Password ❌");
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

        {/* RIGHT LOGIN FORM */}
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

              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-gray-700 mb-2">Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters"
                  }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </button>

          </form>

          {/* SIGNUP LINK */}
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