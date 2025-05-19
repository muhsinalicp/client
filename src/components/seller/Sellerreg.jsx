import { ArrowLeftCircle, Eye, EyeOff, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../api.js";

function Sellerreg() {
  const [storeName, setStoreName] = useState("");
  const [storeDesc, setStoreDesc] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const nav = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem("token");
    if (userData) {
      const decodedUser = jwtDecode(userData);
      setUser(decodedUser.type);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setError("");
    } else {
      setError("Please upload a valid image file (PNG/JPEG)");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("storeName", storeName);
      formData.append("storeDesc", storeDesc);
      formData.append("phone", phone);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("image", image);

      const response = await api.post("/api/auth/registerseller", formData);
      if (response.data.message === "Seller registered successfully") {
        setTimeout(() => {
          nav("/");
        }, 1000);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-200 p-4 flex items-center justify-center ">
        <div className="text-lg shadow-2xl py-6 bg-gray-100 text-gray-600 rounded-xl flex flex-col justify-center items-center w-md">
          <div className="text-xl font-semibold p-2">Not Signed In</div>
          <div>Please sign in to become a seller</div>
          <button
            onClick={() => nav("/")}
            className="py-1 px-2 cursor-pointer rounded-xl bg-gray-600 text-white mt-2"
          >
            back to home
          </button>
        </div>
      </div>
    );
  }

  if (user === "seller") {
    return (
      <div className="min-h-screen bg-gray-200 p-4 flex items-center justify-center ">
        <div className="text-lg shadow-2xl py-6 bg-gray-100 text-gray-600 rounded-xl flex flex-col justify-center items-center w-md">
          <div className="text-xl font-semibold p-2">Already a Seller</div>
          <div>You are already a seller</div>
          <button
            onClick={() => nav("/")}
            className="py-1 px-2 cursor-pointer rounded-xl bg-gray-600 text-white mt-2"
          >
            back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
      <div className="w-xl mx-auto bg-black rounded-lg shadow-md p-6 relative">
        <ArrowLeftCircle
          size={30}
          color="white"
          className="absolute top-6  left-4 cursor-pointer hover:transform hover:scale-110 duration-200"
          onClick={() => nav("/")}
        />
        <h2 className="text-2xl text-center font-bold mb-6 text-gray-100">
          Become a Seller
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Store Name *
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3 py-2 border bg-neutral-200 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1 text-gray-100">
              Store Description
            </label>
            <textarea
              value={storeDesc}
              onChange={(e) => setStoreDesc(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-200 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1 text-gray-100">
              Phone Number *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-neutral-200 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1 text-gray-100">
              Create an Seller Username *
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-neutral-200 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-100">
              Create an Seller Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 bg-neutral-200 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                required
              />
              <div
                className="absolute right-3 top-2 cursor-pointer "
                onClick={() => setShowPassword(!showPassword)}
              >
                {!showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-100 mb-1">
              Store Logo
            </label>
            <div className="mt-1 flex items-center">
              <label className="flex flex-col items-center px-4 py-6 bg-neutral-200 text-blue-500 rounded-lg shadow tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-50 hover:text-blue-600">
                <svg
                  className="w-8 h-8"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span className="mt-2 text-sm">Select Image</span>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/png, image/jpeg"
                />
              </label>
              {image && (
                // <span className="ml-4 text-sm text-gray-600">
                //   {image.name}
                // </span>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="w-24 h-24 object-cover outline ml-3"
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black font-bold cursor-pointer disabled:cursor-progress py-2 px-4 rounded-md hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Become a Seller"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sellerreg;
