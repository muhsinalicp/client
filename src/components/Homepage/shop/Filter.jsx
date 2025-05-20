import { Star } from "lucide-react";
import React, { useState } from "react";
import { VscSettings } from "react-icons/vsc";
import { useParams, useNavigate } from "react-router-dom";

function Filter({ filteringData }) {
  const navigate = useNavigate();
  const paramsCategory = useParams().category;
  const paramsPrice = useParams().price;
  const paramsRating = useParams().rating;

  let category = paramsCategory || "all";
  let price = paramsPrice || "all";
  let rating = paramsRating || "all";

  const handleFilter = (type, value) => {
    if (type === "category") {
      category = value;
    } else if (type === "price") {
      price = value;
    } else if (type === "rating") {
      rating = value;
    } else if (type === "clear") {
      category = price = rating = "all";
    }

    navigate(`/shop/1/${category}/${price}/${rating}`);
  };

  return (
    <section className="border p-4 w-full h-full rounded-xl border-gray-300">
      <div className="flex justify-between items-center h-[6%]  border-b-1 border-gray-200">
        <h1 className="font-semibold">Filter</h1>
        <VscSettings size={20} />
      </div>

      {/* category section */}
      <div className="border-b-1 border-gray-200 h-[30%]  pb-2">
        <h1 className="py-2 font-semibold h-[20%]">Category</h1>
        <div className="flex flex-col h-[80%] gap-1 overflow-y-auto">
          <div className="flex flex-col  gap-2">
            {filteringData.category.map((category, i) => (
              <label
                className="flex items-center gap-2"
                htmlFor={category}
                key={i}
              >
                <input
                  className="hidden"
                  type="radio"
                  name="category"
                  value={category}
                  onChange={() => handleFilter("category", category)}
                />
                <div
                  onClick={() => handleFilter("category", category)}
                  className={`size-5 rounded-full border-1 border-gray-300 ${
                    paramsCategory === category ? "bg-black" : ""
                  }`}
                ></div>
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* price section */}
      <div className="border-b-1 h-[30%] border-gray-200 pb-2">
        <h1 className="py-2 h-[20%] font-semibold">Price</h1>
        <div className="flex flex-col gap-1 h-[80%] overflow-y-auto">
          <div className="flex flex-col  gap-2">
            {filteringData.price.map((price, i) => (
              <label
                className="flex items-center gap-2"
                htmlFor={price}
                key={i}
              >
                <input
                  className="hidden"
                  type="radio"
                  name="price"
                  value={price}
                  onChange={() => handleFilter("price", price)}
                />
                <div
                  onClick={() => handleFilter("price", price)}
                  className={`size-5 rounded-full border-1 border-gray-300 ${
                    paramsPrice === String(price) ? "bg-black" : ""
                  }`}
                ></div>
                <span>less than ₹{price}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* rating section */}
      <div className="border-b-1 h-[28%] border-gray-200 pb-2">
        <h1 className="py-2 h-[20%] font-semibold">Rating</h1>
        <div className="flex flex-col gap-1 h-[80%] overflow-y-auto">
          <div className="flex flex-col  gap-2">
            {filteringData.rating.map((rating, i) => (
              <label
                className="flex items-center gap-2"
                htmlFor={rating}
                key={i}
              >
                <input
                  className="hidden"
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={paramsRating === String(rating.rating)}
                  onChange={() => handleFilter("rating", rating.rating)}
                />
                <div
                  onClick={() => handleFilter("rating", rating.rating)}
                  className={`size-5 rounded-full border-1 border-gray-300 ${
                    paramsRating === String(rating.rating) ? "bg-black" : ""
                  }`}
                ></div>
                <span className="flex items-center gap-1">
                  {rating.rating}
                  <Star fill="yellow" className="text-yellow-500" size={14} />
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center gap-2 py-2">
        <button
          onClick={() => handleFilter("clear")}
          className="bg-red-500 text-white px-14  py-2 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer"
        >
          Clear Filter
        </button>
      </div>
    </section>
  );
}

export default Filter;
