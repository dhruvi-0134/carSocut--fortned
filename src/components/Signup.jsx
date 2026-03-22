import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Correct validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {

      // ✅ Send correct data
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );

      console.log(response.data);

      alert(response.data.message);

      navigate("/login");

    } catch (err) {

      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Server Error");
      }

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex w-[900px]">

        {/* Left Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8"
            alt="Car"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-10">

          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            CarScout Sign Up 🚗
          </h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Signup;