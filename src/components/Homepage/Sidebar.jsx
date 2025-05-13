import { LogOutIcon, X } from "lucide-react";
import React, { useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AuthContext } from "../../context/context";

function Sidebar({ sidebar, setsidebar }) {
  const auth = useContext(AuthContext);

  const handlelogout = () => {
    auth.setIsAuth(false);
    sessionStorage.removeItem("token");
    setsidebar(false);
  };

  return (
    <AnimatePresence>
      {sidebar && (
        <motion.div
          key="sidebar"
          className="h-[100vh] md:w-1/4 w-[90%] bg-black/40 backdrop-blur-sm top-0 right-0 shadow-2xl fixed z-58 p-2 "
          initial={{ x: "+100%" }}
          animate={{ x: 0 }}
          exit={{ x: "+100%" }}
          transition={{ duration: 0.3 }}
        >
          <div className=" h-full w-full relative py-10">
            <X
              color="white"
              className="absolute top-3  right-3 cursor-pointer hover:transform hover:scale-140 duration-200"
              onClick={() => setsidebar(!sidebar)}
            />

            <div className="h-full w-full flex flex-col justify-end  text-white ">
              <div
                className="outline-2 active:bg-neutral-950 hover:bg-neutral-900 rounded-lg px-4 py-2  cursor-pointer "
                onClick={handlelogout}
              >
                <div className="flex gap-2 items-center   hover:transform hover:scale-102 duration-200">
                  <LogOutIcon size={25} color="white" className="" />
                  <div className="text-2xl font-bold">Logout</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Sidebar;
