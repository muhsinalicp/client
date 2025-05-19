import { CircleUserRoundIcon, LucideShoppingCart, Menu } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SignModal from "../signing/SignModal";
import Sidebar from "./Sidebar";
import { AuthContext } from "../../context/context";
import { IoArrowBack } from "react-icons/io5";

function Navbar() {
  const auth = useContext(AuthContext);

  const [open, setopen] = useState(false);
  const [sidebar, setsidebar] = useState(false);
  const nav = useNavigate();
  const { pathname } = useLocation();

  return (
    <div className="p-5  h-[8vh] flex justify-between items-center">
      <div className="flex items-center gap-4">
        {pathname !== "/" && (
          <div className="hover:cursor-pointer">
            <IoArrowBack
              size={30}
              className="hover:transform hover:scale-110 duration-200"
              onClick={() => nav(-1)}
            />
          </div>
        )}
        <h1
          onClick={() => nav("/")}
          className="text-xl head-font hover:cursor-pointer text-nowrap "
        >
          Cart-Hive
        </h1>
      </div>
      <div className="hidden lg:flex ">
        <ul className="flex gap-4  h-full tracking-wider">
          <Link
            to="/"
            className="hover:cursor-pointer hover:transform duration-200  hover:scale-110 active:text-sky-600"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:cursor-pointer hover:transform duration-200  hover:scale-110 active:text-sky-600"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:cursor-pointer hover:transform duration-200  hover:scale-110 active:text-sky-600"
          >
            Contact
          </Link>
        </ul>
      </div>
      {auth.isAuth ? (
        <div>
          <div className="lg:hidden">
            <Menu onClick={() => setsidebar(!sidebar)} size={30} />
          </div>
          <div className=" gap-4 hidden lg:flex">
            <LucideShoppingCart
              onClick={() => nav("/cart")}
              className="hover:cursor-pointer  lg:hover:transform hover:scale-110"
              size={30}
            />
            <CircleUserRoundIcon
              onClick={() => setsidebar(!sidebar)}
              className="hover:cursor-pointer lg:hover:transform hover:scale-110 "
              size={30}
            />
          </div>
        </div>
      ) : (
        <div className=" gap-1 flex h-8 md:h-fit justify-end w-full md:w-fit ">
          <button
            onClick={() => nav("/signup")}
            className="bg-black text-white px-3 w-fit  md:text-sm lg:px-8 lg:py-2 rounded-4xl text-xs hover:cursor-pointer hover:transform hover:scale-102"
          >
            Sign Up
          </button>
          <button
            onClick={() => setopen(!open)}
            className="bg-neutral-600 text-white px-3 text:sm text-xs py-2 lg:px-8 lg:py-2 rounded-4xl hover:cursor-pointer hover:transform hover:scale-102"
          >
            Sign In
          </button>
        </div>
      )}
      {open && <SignModal setOpen={setopen} />}
      {sidebar && <Sidebar sidebar={sidebar} setsidebar={setsidebar} />}
    </div>
  );
}

export default Navbar;
