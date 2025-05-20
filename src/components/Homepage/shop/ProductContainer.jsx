import { Star } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
function ProductContainer({ data }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-2">
      {data.map((product) => (
        <div
          onClick={() => navigate(`/product/${product._id}`)}
          key={product._id}
          className=" rounded-xl  p-2 w-full h-full hover:cursor-pointer hover:shadow-xs hover:scale-101 transition-all duration-300"
        >
          <div className="h-56">
            <img
              src={product.images[0]}
              className="w-full h-full object-cover rounded-xl"
              alt={product.name}
            />
          </div>

          <div className="flex flex-col justify-start w-full  px-2">
            <span className="font-semibold text-lg lg:text-xl overflow-x-scroll">
              {product.name}
            </span>

            <span className="flex gap-1 items-center">
              {Array.from({ length: product.avgRating }).map((_, index) => (
                <Star
                  key={index}
                  className="text-yellow-400"
                  fill="gold"
                  size={20}
                />
              ))}
              <span className="text-gray-500">{product?.avgRating}/5</span>
            </span>

            <span className="font-semibold text-lg lg:text-xl">
              Rs. {product.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductContainer;
