import React from "react";
import hero from "../../assets/heroimage.png";
import { Link, useNavigate } from "react-router-dom";

function Hero() {
  return (
    <div className="h-full w-full ">
      <div className="h-full bg-[#F2F0F1] w-full flex justify-center items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full w-full">
          <div className="p-8 flex flex-col  justify-center">
            <div className="head-font text-4xl lg:text-6xl ">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </div>

            <div className="text-gray-500 text-sm py-3  ">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </div>

            <div>
              <Link to="/shop">
                <button className="bg-black text-white px-14 py-3 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer">
                  Shop Now
                </button>
              </Link>
            </div>

            <div className="flex lg:justify-between mt-6 lg:mt-10  justify-center space-y-1.5 ">
              <div className="flex flex-col">
                <span className="text-2xl lg:text-5xl  font-bold tracking-wide">
                  2000+
                </span>
                <span className="text-gray-500 text-sm">
                  International Brands
                </span>
              </div>

              <div className="flex flex-col border-gray-500 lg:border-l-2 pl-6 ">
                <span className="text-2xl lg:text-5xl font-bold tracking-wide">
                  5000+
                </span>
                <span className="text-gray-500 text-sm">
                  High Quality Products
                </span>
              </div>

              <div className="flex flex-col border-gray-500 lg:border-l-2 pl-6 ">
                <span className="text-2xl lg:text-5xl font-bold tracking-wide">
                  80000+
                </span>
                <span className="text-gray-500 text-sm">Happy Customers</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center h-full w-full overflow-hidden">
            <img src={hero} className="mt-50 w-full" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
