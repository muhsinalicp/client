import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

function Products() {
  const nav = useNavigate();

  const [products, setproducts] = useState([]);
  const [change, setChange] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get(`api/seller/products`);

        setproducts(res.data.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [change]);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await api.delete(`seller/deleteproduct/${id}`);
      console.log(res.data);
      if (res.data.status === "done") {
        setChange(!change);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center  p-2">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full h-full p-4">
        <h1 className="text-lg font-semibold text-center py-8">
          No products found
        </h1>
        <div className="flex gap-2 h-fit w-full justify-center">
          <div>
            <button
              onClick={() => nav("/sellerhome/products/addproduct")}
              className="bg-black text-white px-8 py-2 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer active:bg-gray-800"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex  flex-col px-2 gap-4">
      <div className="flex gap-2 h-fit w-full justify-between">
        <div className="">
          {/* <h1 className="text-2xl font-bold">Your Products:</h1> */}
        </div>

        <div>
          <button
            onClick={() => nav("/sellerhome/products/addproduct")}
            className="bg-black text-white px-8 py-2 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer active:bg-gray-800"
          >
            Add Productkkk
          </button>
        </div>
      </div>

      <div className=" w-full  px-4 overflow-y-scroll">
        <div className="grid grid-cols-4 gap-4">
          {products.map((prod) => (
            <div
              key={prod._id}
              className="flex flex-col gap-2  rounded-lg h-96 p-4 bg-white "
            >
              <img
                src={prod.images[0]}
                className="w-full h-1/2 object-contain"
                loading="lazy"
                alt={prod.productname}
              />
              <div className="font-bold text-center first-letter:uppercase text-xl">
                {prod.productname}
              </div>
              <div className="font-extrabold text-2xl text-center">
                ₹ {prod.productprice}
              </div>

              <button className="bg-black text-white font-bold first-letter:uppercase px-8 py-2 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer active:bg-gray-800">
                edit
              </button>
              <button
                onClick={() => handleDelete(prod._id)}
                className="bg-black text-white font-bold first-letter:uppercase px-8 py-2 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer active:bg-gray-800"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
