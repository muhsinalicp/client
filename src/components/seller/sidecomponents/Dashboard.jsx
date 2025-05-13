import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../../../api";

function Dashboard() {
  const [data, setdata] = useState();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get(`seller/dashboard`);
        setdata(res.data.data);
      } catch (err) {
        console.log(
          "error in dashboard component is: ",
          err.response.data.message
        );
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
