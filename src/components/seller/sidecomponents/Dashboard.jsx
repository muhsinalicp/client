import React, { useEffect, useState } from "react";
import api from "../../../api";

function Dashboard() {
  const [data, setdata] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get(`/api/seller/dashboard`);
        setdata(res.data.data);
      } catch (err) {
        if (
          err.response.data.message ===
            "Access denied. No token provided. Please log in." ||
          err.response.data.message ===
            "Invalid or expired token. Please log in again." ||
          err.response.data.message === "Unauthorized"
        ) {
          toast.error("Unauthorized");
        }
      }
    };

    fetchdata();
  }, []);

  return (
    <div className="w-full h-full ">
      <div className="flex p-2">
        <h1 className="text-2xl font-bold">
          Hello, {data?.username || "User"}👋
        </h1>
      </div>
    </div>
  );
}

export default Dashboard;
