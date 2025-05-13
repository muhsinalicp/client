import React, { useEffect, useState } from "react";
import api from "../../../api";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
function AlsoLike({ categories }) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/products/${categories}`);
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categories]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div className="w-full">
      <div className=" w-full flex justify-center items-center  text-2xl md:text-4xl pt-5 head-font">
        YOU MIGHT ALSO LIKE
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 py-5 px-5 lg:px-12 ">
        {data.map((item) => (
          <div
            key={item._id}
            className="flex flex-col  items-center hover:transform  hover:scale-102 duration-200 hover:shadow-sm rounded-2xl p-2 cursor-pointer  "
            onClick={() => nav(`/product/${item._id}`)}
          >
            <div className="w-full  flex flex-col justify-center items-center rounded-3xl">
              <div className=" w-full h-40 lg:h-90 rounded-2xl flex items-center justify-center">
                <img
                  className="w-full h-full object-cover rounded-2xl"
                  src={item.images[0]}
                  alt=""
                />
              </div>

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
                  <span className="text-gray-500">
                    {item.avgRating.toFixed(1)}/5
                  </span>
                </span>

                <span className="font-semibold text-lg lg:text-xl">
                  Rs. {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AlsoLike;
