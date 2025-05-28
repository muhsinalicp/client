import axios from "axios";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import loading from "../../assets/loading.gif";

function Arrivalpage() {
  const [data, setdata] = useState([
    {
      images: [loading],
    },
    {
      images: [loading],
    },
    {
      images: [loading],
    },
    {
      images: [loading],
    },
  ]);

  const nav = useNavigate();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get("/api/user/newarrivals");
        setdata(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchdata();
  }, []);

  return (
    <div className="h-full w-full">
      <div className=" w-full flex justify-center items-center text-4xl pt-5 head-font">
        NEW ARRIVALS
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 py-5 px-5 lg:px-12 ">
        {data.map((item) => (
          <div
            key={item._id}
            className="flex flex-col  items-center hover:transform  hover:scale-102 duration-200 hover:shadow-sm rounded-2xl p-2 cursor-pointer  "
            onClick={() => {
              item.name && nav(`/product/${item._id}`);
            }}
          >
            <div className="w-full  flex flex-col justify-center items-center rounded-3xl">
              <div className=" w-full h-40 lg:h-90 rounded-2xl flex items-center justify-center">
                <img
                  className={` object-cover rounded-2xl ${
                    item.images[0] === loading
                      ? " animate-pulse"
                      : "w-full h-full"
                  }`}
                  src={item.images[0]}
                  alt=""
                />
              </div>

              {item.name && (
                <div className="flex flex-col justify-start w-full py-3 px-2">
                  <span className="font-semibold text-xl lg:text-2xl overflow-x-scroll">
                    {item.name}
                  </span>

                  <span className="flex gap-1 items-center">
                    {Array.from({ length: item.avgRating }).map((_, index) => (
                      <Star
                        key={index}
                        className="text-yellow-400"
                        fill="gold"
                        size={20}
                      />
                    ))}
                    <span className="text-gray-500">{item?.avgRating}/5</span>
                  </span>

                  <span className="font-semibold text-lg lg:text-xl">
                    Rs. {item.price}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex justify-center items-center py-5">
        <button className=" outline-1 outline-gray-400 px-14 py-2 rounded-4xl hover:bg-gray-200 hover:cursor-pointer">
          View All
        </button>
      </div>
    </div>
  );
}

export default Arrivalpage;
