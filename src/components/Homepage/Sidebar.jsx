import { LogOutIcon, X } from "lucide-react";
import React, { useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AuthContext } from "../../context/context";
import { FaAngleDoubleRight } from "react-icons/fa";
import {
  IoBagCheckOutline,
  IoCartOutline,
  IoChatbubblesOutline,
  IoHomeOutline,
  IoInformationCircleOutline,
  IoLogOutOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
function Sidebar({ sidebar, setsidebar }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handlelogout = () => {
    auth.setIsAuth(false);
    sessionStorage.removeItem("token");
    setsidebar(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <AnimatePresence>
      {sidebar && (
        <motion.div
          key="sidebar"
          className="h-[100vh] md:w-1/6 w-[90%]  bg-black backdrop-blur-sm top-0 right-0 shadow-2xl fixed z-58 p-2 "
          initial={{ x: "+100%" }}
          animate={{ x: 0 }}
          exit={{ x: "+100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className=" h-full w-full outline relative pb-10 md:pb-0 pt-12">
            <div className="w-full flex justify-between outline p-2 absolute top-0">
              <h1 className="text-white text-2xl head-font">Cart-Hive</h1>
              <FaAngleDoubleRight
                size={30}
                color="white"
                className=" cursor-pointer hover:transform hover:scale-140 duration-200"
                onClick={() => setsidebar(!sidebar)}
              />
            </div>

            <div className="text-white text-2xl py-2 flex flex-col outline outline-white h-full justify-between ">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleNavigation("/")}
                  className="hover:bg-neutral-900 rounded-lg px-4 py-2  cursor-pointer flex items-center gap-2 "
                >
                  <IoHomeOutline size={28} />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => handleNavigation("/orders")}
                  className="hover:bg-neutral-900 rounded-lg px-4 py-2  cursor-pointer flex items-center gap-2 "
                >
                  <IoBagCheckOutline size={28} />
                  <span>Your Orders</span>
                </button>
                <button
                  onClick={() => handleNavigation("/cart")}
                  className="hover:bg-neutral-900 rounded-lg px-4 py-2  cursor-pointer flex items-center gap-2 "
                >
                  <IoCartOutline size={28} />
                  <span>Your Cart</span>
                </button>
                <button
                  onClick={() => handleNavigation("/about")}
                  className="hover:bg-neutral-900 rounded-lg px-4 py-2  cursor-pointer flex items-center gap-2 "
                >
                  <IoInformationCircleOutline size={28} />
                  <span>About</span>
                </button>
                <button
                  onClick={() => handleNavigation("/contact")}
                  className="hover:bg-neutral-900 rounded-lg px-4 py-2  cursor-pointer flex items-center gap-2 "
                >
                  <IoChatbubblesOutline size={28} />
                  <span>Contact</span>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleNavigation("/settings")}
                  className="hover:bg-neutral-900 rounded-lg px-4 py-2  cursor-pointer flex items-center gap-2 "
                >
                  <IoSettingsOutline size={28} />
                  <span>Settings</span>
                </button>
                <button
                  onClick={handlelogout}
                  className="hover:bg-neutral-900 rounded-lg px-4 py-2  cursor-pointer flex items-center gap-2 "
                >
                  <IoLogOutOutline size={28} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
