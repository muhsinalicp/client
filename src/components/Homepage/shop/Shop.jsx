import React from "react";
import Navbar from "../Navbar";
import { useLocation } from "react-router-dom";
import Footer from "../Footer";
import Filter from "./Filter";
import Products from "./Products";

function Shop() {
  const { pathname } = useLocation();
  console.log(pathname.split("/")[1]);

  return (
    <div className="w-screen max-h-screen">
      <div className="border-b-1 border-gray-300">
        <Navbar />
      </div>
      <section className="p-4 w-full h-full flex ">
        {/* filter section  */}
        <section className="px-4 w-[20%]">
          <Filter />
        </section>

        {/* product section */}
        <section>
          <Products />
        </section>
      </section>
    </div>
  );
}

export default Shop;
