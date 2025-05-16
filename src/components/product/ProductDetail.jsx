import React, { useEffect, useState } from "react";
import Navbar from "../Homepage/Navbar";
import { Loader2, Minus, Plus, Star } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "motion/react";
import api from "../../api";
import toast, { Toaster } from "react-hot-toast";
import ProductDescriptions from "./components/ProductDescriptions";
import AlsoLike from "./components/AlsoLike";
import Footer from "../Homepage/Footer";

function ProductDetail() {
  const { id } = useParams();
  const [product, setproduct] = useState();
  const [count, setcount] = useState(1);
  const [loading, setloading] = useState(false);
  const [selectedImage, setselectedImage] = useState();
  const [showBreadcrumb, setshowBreadcrumb] = useState(false);

  useEffect(() => {
    const fetchdata = async () => {
      setloading(true);
      try {
        const res = await api.get(`product/${id}`);
        setproduct(res.data.data);
        setselectedImage(res.data.data.images[0]);
      } catch (err) {
        console.log(err);
      } finally {
        setloading(false);
      }
    };

    fetchdata();
  }, [id]);

  function handlecount(type) {
    if (type === "plus") {
      setcount(count + 1);
    } else {
      if (count > 1) {
        setcount(count - 1);
      }
    }
  }

  function handleimage(image) {
    setselectedImage(image);
  }

  function handleaddtocart(id, count) {
    const data = {
      productid: product._id,
      quantity: count,
    };

    setshowBreadcrumb(true);
    setTimeout(() => {
      setshowBreadcrumb(false);
    }, 3000);
  }

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center  p-2">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-fit md:min-h-[84vh] w-screen flex flex-col  overflow-hidden ">
      <div>
        <Toaster />
      </div>
      <div>
        <Navbar />
      </div>

      <div className="flex flex-col md:flex-row w-full h-full  justify-between p-2 md:p-8  ">
        {/* image section  */}
        <div className="flex flex-1 gap-3   max-w-full flex-col-reverse xl:flex-row p-2">
          {/* select image section  */}
          <div className="h-full flex md:flex-col overflow-x-auto scrollbar-hidden gap-3">
            {product?.images.map((item, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[80px] h-[80px] md:w-36 md:h-36 rounded-2xl flex items-center justify-center
                            cursor-pointer ${
                              selectedImage === item
                                ? "border-1 border-black"
                                : ""
                            }`}
              >
                <img
                  src={item}
                  className="w-[90%] h-[90%] object-cover rounded-xl"
                  alt={`product-image-${index}`}
                />
              </div>
            ))}
          </div>

          {/* selected image section  */}
          <div>
            <div className="w-full h-full md:w-[540px] md:h-[580px] rounded-2xl flex items-center justify-center">
              <img
                src={selectedImage}
                className="w-full h-full object-cover rounded-xl"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* description section  */}
        <div className="flex  py-4  w-full   md:py-12 px-4">
          <div className="flex flex-col w-full gap-6 ">
            {/* product title  */}
            <h1 className="uppercase head-font text-lg  md:text-4xl">
              {product?.name}
            </h1>

            {/* rating  */}
            <span className="flex gap-1">
              {Array.from({ length: product?.avgRating }).map((_, index) => (
                <Star
                  key={index}
                  fill="gold"
                  size={30}
                  className="text-yellow-400"
                />
              ))}
              <span className="text-gray-500">{product?.avgRating}/5</span>
            </span>

            {/* description  */}
            <span className="md:w-3/4 text-xs">{product?.description}</span>

            {/* price  */}
            <span className="font-extrabold head-font text-lg lg:text-3xl">
              ₹ {product?.price}
            </span>

            {/* available colors */}
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-bold">Available Colors:</h1>
              <div className="flex gap-4">
                {product?.colors.map((item, index) => (
                  <span
                    key={index}
                    className={`w-6 h-6 rounded-full hover:scale-110 duration-200 border-2 border-gray-400 inline-block peer-checked:ring-2 peer-checked:ring-red-500`}
                    style={{ backgroundColor: item.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            {/* available sizes */}
            <div className="flex flex-col gap-2">
              <h1 className="text-base font-bold">Available Sizes:</h1>
              <div className="flex gap-4">
                {/* {product?.sizes.map((item, index) => (
                  <span className="size-12 flex items-center justify-center font-extrabold rounded-full bg-zinc-100">
                    {item}
                  </span>
                ))} */}

                {["S", "M", "L", "XL"].map((item, index) => (
                  <span
                    key={index}
                    className={`${
                      product?.sizes.includes(item)
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    } size-10 flex items-center justify-center font-extrabold rounded-full`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* quantity and add to cart  */}
            <div className="w-full h-fit flex flex-col md:flex-row gap-2 md:gap-12">
              <span className="py-3 rounded-2xl bg-zinc-100 flex items-center flex-1  justify-between gap-2 px-4">
                <button
                  className="text-2xl"
                  onClick={() => handlecount("minus")}
                >
                  <Minus />
                </button>
                <h1 className="font-bold">{count}</h1>
                <button
                  className="text-2xl"
                  onClick={() => handlecount("plus")}
                >
                  <Plus />
                </button>
              </span>
              <span
                onClick={() => {
                  handleaddtocart(product._id, count);
                  toast.success("Successfully toasted!");
                }}
                className="h-full py-3 rounded-2xl bg-black text-white flex-1 flex items-center justify-center cursor-pointer px-12"
              >
                Add To Cart
              </span>
            </div>
          </div>
        </div>
      </div>

      <ProductDescriptions data={product} />

      <AlsoLike categories={product?.category} />
    </div>
  );
}

export default ProductDetail;
