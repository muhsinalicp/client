import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductContainer from "./ProductContainer";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Search } from "lucide-react";

function Products({ data, totalPages }) {
  const { page, category, price, rating } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const handlePageChange = (type) => {
    if (type === "prev" && Number(page) > 1) {
      navigate(`/shop/${Number(page) - 1}/${category}/${price}/${rating}`);
    } else if (type === "next" && Number(page) < totalPages) {
      navigate(`/shop/${Number(page) + 1}/${category}/${price}/${rating}`);
    } else {
      toast.error("No more pages");
    }
  };

  return (
    <div className="w-full h-full rounded-xl flex flex-col gap-4 justify-between">
      <div className="flex items-center h-fit  flex-col md:flex-row justify-between">
        <h1 className="head-font text-3xl uppercase">
          {category === "all" ? "All Products" : category}
        </h1>
        <div className="flex items-center gap-1 w-full md:w-auto">
          <div className="relative w-full md:w-auto ">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border w-full border-gray-300 rounded-md px-8 py-1"
              type="text"
              placeholder="Search for products"
            />
            <button className="absolute left-1 top-0 bottom-0">
              <Search className="text-gray-500" size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 h-full  md:h-full ">
        <ProductContainer data={filteredData} />
      </div>

      <div className="flex items-center justify-between h-fit px-2 text-sm">
        <button
          className="flex items-center gap-2 border border-gray-300 active:bg-gray-200 hover:bg-gray-100 px-2 py-1 rounded-md"
          onClick={() => handlePageChange("prev")}
        >
          <FaArrowLeft />
          Previous
        </button>

        <div>
          {page} of {totalPages}
        </div>

        <button
          className="flex items-center gap-2 border border-gray-300 active:bg-gray-200 hover:bg-gray-100 px-2 py-1 rounded-md"
          onClick={() => handlePageChange("next")}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default Products;
