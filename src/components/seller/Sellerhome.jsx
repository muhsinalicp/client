import React, { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/context";
import { MdShoppingBag, MdSpaceDashboard } from "react-icons/md";
import { FaMailchimp } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import api from "../../api";
import toast, { Toaster } from "react-hot-toast";

function Sellerhome() {
  const auth = useContext(AuthContext);

  const nav = useNavigate();
  const { pathname } = useLocation();

  const handlelogout = async () => {
    sessionStorage.removeItem("token");
    auth.setIsAuth(false);
    nav("/");
  };

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get(`/api/seller/dashboard`);
      } catch (err) {
        if (
          err.response.data.message ===
            "Access denied. No token provided. Please log in." ||
          err.response.data.message ===
            "Invalid or expired token. Please log in again." ||
          err.response.data.message === "Not authorized"
        ) {
          toast.error("Unauthorized");
          setTimeout(() => {
            handlelogout();
          }, 1000);
        }
      }
    };

    fetchdata();
  }, []);

  const items = [
    {
      id: 1,
      name: "Dashboard",
      desc: "view your dashboard",
      link: "dashboard",
      icon: <MdSpaceDashboard />,
    },
    {
      id: 2,
      name: "Products",
      desc: "discover your products",
      link: "products",
      icon: <MdShoppingBag />,
    },
    {
      id: 3,
      name: "Orders",
      desc: "view your orders",
      link: "orders",
      icon: <GrTransaction />,
    },
  ];

  return (
    <div className="w-screen h-screen  flex flex-col  ">
      <Toaster position="bottom-right" />
      <div className="w-full h-full flex   ">
        {/* sidebar */}
        <div className="w-[20%] h-full bg-[#141416] outline-1 outline-gray-100 flex flex-col justify-between  gap-2 ">
          <div>
            <div className="w-full h-20 flex gap-2 px-4 text-white items-center cursor-default">
              <FaMailchimp size={28} stroke="1" />
              <p className="text-2xl font-bold">Cart-hive</p>
            </div>

            <div className="p-2 space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`w-full flex gap-2 items-center p-3 text-gray-500 hover:bg-[#222224] font-medium hover:text-white cursor-pointer rounded-lg 
                  ${
                    pathname ===
                    (item.link === "dashboard"
                      ? "/sellerhome"
                      : `/sellerhome/${item.link}`)
                      ? "bg-[#222224] text-white"
                      : ""
                  }`}
                  onClick={() => {
                    nav(
                      item.link === "dashboard"
                        ? "/sellerhome"
                        : `/sellerhome/${item.link}`
                    );
                  }}
                >
                  {item.icon}
                  <p className="text-sm">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* main content */}
        <div className="w-full h-full  flex flex-col gap-2  p-2 bg-gray-100 ">
          <div className="border-b-1 h-[7%] border-gray-200 px-2 items-center flex justify-between">
            <div>
              <h1 className="capitalize font-bold text-xl">
                {pathname.split("/")[2] || "Dashboard"}
              </h1>
              <h6 className="text-gray-500 font-mono text-xs tracking-wider">
                {items.find((item) => item.link === pathname.split("/")[2])
                  ?.desc || "view your dashboard"}
              </h6>
            </div>

            <div className="flex gap-2 items-center">
              <AiOutlineLogout onClick={handlelogout} size={36} />
            </div>
          </div>
          <div className="w-full h-[93%] ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sellerhome;
