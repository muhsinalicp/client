import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Filter from "./Filter";
import Products from "./Products";
import api from "../../../api";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast/headless";
import { Loader2 } from "lucide-react";
import { useParams } from "react-router-dom";
const arrRating = [
  {
    id: 1,
    rating: 1,
  },
  {
    id: 2,
    rating: 2,
  },
  {
    id: 3,
    rating: 3,
  },
  {
    id: 4,
    rating: 4,
  },
];
function Shop() {
  const { category, price, rating, page } = useParams();

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filteringData, setFilteringData] = useState({
    category: [],
    price: [],
    rating: [],
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await api.get(`/api/user/allproducts/${page}`, {
          params: { category: category, price: price, rating: rating },
        });
        setData(res.data.products);
        console.log(res.data.products);
        setTotalPages(res.data.totalPages);
        setFilteringData({
          category: res.data.availableCategories,
          price: res.data.priceRange,
          rating: arrRating,
        });
      } catch (error) {
        console.log("error in fetching data", error);
        toast.error("error in fetching data", {
          position: "bottom-right",
          icon: "⚠️",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, price, rating, page]);

  if (loading) {
    return (
      <div className="w-screen h-screen overflow-hidden">
        <div className="w-full h-full">
          <Navbar />

          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-10 h-10 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen max-h-screen">
      <Toaster />
      <div className="border-b-1 border-gray-300">
        <Navbar />
      </div>
      <section className="p-4 w-full h-[90%] flex ">
        {/* filter section  */}
        <section className="px-4 w-[20%]">
          <Filter
            filteringData={filteringData}
            setFilteringData={setFilteringData}
          />
        </section>

        {/* product section */}
        <section className="w-[80%]">
          <Products data={data} totalPages={totalPages} />
        </section>
      </section>
    </div>
  );
}

export default Shop;
