import React, { useState } from "react";
import ProductDetails from "./ProductDetails";
import ReviewUser from "./ReviewUser";
import Faq from "./Faq";

function ProductDescriptions({ data }) {
  const [description, setDescription] = useState("product-details");

  const options = [
    {
      label: "Product Details",
      value: "product-details",
    },
    {
      label: "Reviews & Ratings",
      value: "reviews-ratings",
    },
    {
      label: "FAQ's",
      value: "faqs",
    },
  ];

  return (
    <div className="w-full h-full p-4 ">
      <div className={`w-full   grid grid-cols-3`}>
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => setDescription(option.value)}
            className={`w-full h-full p-4 text-xs md:text-sm  hover:cursor-pointer hover:bg-gray-100 duration-200  font-medium flex justify-center items-center ${
              option.value === description
                ? "text-black border-b-2 border-black"
                : "text-gray-400 border-b-2 border-gray-200"
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>

      <div className="w-full h-full p-4">
        {description === "product-details" && <ProductDetails data={data} />}
        {description === "reviews-ratings" && <ReviewUser />}
        {description === "faqs" && <Faq />}
      </div>
    </div>
  );
}

export default ProductDescriptions;
