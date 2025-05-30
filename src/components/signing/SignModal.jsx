import axios from "axios";
import React, { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/context";
import api from "../../api.js";
import { toast, Toaster } from "react-hot-toast";
function SignModal({ setOpen }) {
  const auth = useContext(AuthContext);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setIsLoading(true);

      try {
        const response = await api.post("/api/auth/login", formData);

        if (
          response.data.status === "login successful" &&
          response.data.userType === "user"
        ) {
          auth.setIsAuth(true);
          sessionStorage.setItem("token", response.data.token);
          setOpen(false);
        } else if (
          response.data.status === "login successful" &&
          response.data.userType === "seller"
        ) {
          auth.setIsAuth(true);
          sessionStorage.setItem("token", response.data.token);
          nav("/sellerhome");
          setOpen(false);
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.status ||
          "Login failed. Please try again after sometimes";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, setOpen]
  );

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const inputClassName =
    "w-full px-3 py-2 border text-black bg-white rounded-lg placeholder:text-gray-400 focus:outline-none focus:ring focus:border-blue-500";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-60">
      <Toaster />
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={() => setOpen(false)}
        role="button"
        aria-label="Close modal"
        tabIndex={0}
      />

      <div className="bg-black rounded-lg shadow-lg pb-8 px-6 w-11/12 md:w-[35%] h-fit z-[51] relative text-white">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-100 hover:text-red-500"
          onClick={() => setOpen(false)}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h1 className="text-2xl text-white pt-8 font-bold text-center">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="username" className="block text-xl font-medium">
              Username:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className={inputClassName}
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xl font-medium">
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={inputClassName}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength="6"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black font-bold px-4 py-2 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default React.memo(SignModal);
