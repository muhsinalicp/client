import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Loader2,
  Search,
  Settings2,
  Trash,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api";

const itemsPerPage = 7;

function ProductSeller() {
  const nav = useNavigate();

  const [products, setproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await api.get(`seller/products`);
        setproducts(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.price.toString().includes(search);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // reset page
  }, [search, selectedCategory, products]);

  let categories = products.map((product) => product.category);
  categories.unshift("All");
  const uniqueCategories = [...new Set(categories)];

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await api.delete(`seller/deleteproduct/${id}`);
      console.log(res.data);
      if (res.data.status === "done") {
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

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
          No products found.
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
    <div className="w-full h-full p-2">
      <div className="w-full h-full bg-white rounded-lg flex flex-col gap-2 px-4 py-2">
        {/* search and add product */}
        <div className="flex justify-between items-center py-4">
          <div className="w-1/2 relative">
            <input
              type="text"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, category, price"
              className="w-full p-2 rounded-lg border-2 border-gray-300"
            />
            <div className="absolute right-4 top-0 h-full flex items-center justify-center">
              <Search size={20} className="text-gray-500" />
            </div>
          </div>

          <div>
            <button
              onClick={() => nav("/sellerhome/products/addproduct")}
              className="bg-black text-white px-8 py-2 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer active:bg-gray-800"
            >
              Add Product
            </button>
          </div>
        </div>

        {/* categories */}
        <div className="flex gap-2 justify-between outline-2 outline-gray-200 p-1 mb-2 rounded-lg">
          {uniqueCategories.map((category) => (
            <div
              key={category}
              className={` px-2 py-1 rounded-lg w-full text-center  font-medium hover:cursor-pointer ${
                selectedCategory === category
                  ? "bg-gray-300 text-black"
                  : "text-gray-500"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>

        {/* products */}
        <table className="w-full outline outline-gray-100 rounded-lg">
          <thead className="bg-gray-100 font-normal">
            <tr className=" [&>th]:py-4 [&>th]:px-2 [&>th]:font-medium">
              <th className="text-left">Product</th>
              <th className="text-left">Price</th>
              <th className="text-left">Stocks</th>
              <th className="text-left">Status</th>
              <th className=" text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr
                className="[&>td]:py-4 [&>td]:px-2 border-t border-gray-300 text-gray-500"
                key={product._id}
              >
                <td>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg"
                    />
                    {product.name}
                  </div>
                </td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="w-1/2">
                    {product.stock > 0 ? (
                      <div className="text-green-800 bg-green-200 px-2 py-1 rounded-lg text-center">
                        available
                      </div>
                    ) : (
                      <div className="text-red-500 bg-red-100 px-2 py-1 rounded-lg">
                        Out of Stock
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex items-center justify-end gap-4">
                    <Settings2 size={20} />
                    <Edit
                      onClick={() =>
                        nav(`/sellerhome/products/editproduct/${product._id}`)
                      }
                      className="hover:text-blue-500 cursor-pointer scale-105 duration-200"
                      size={20}
                    />
                    <Trash
                      onClick={() => handleDelete(product._id)}
                      className="hover:text-red-500 cursor-pointer scale-105 duration-200"
                      size={20}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination */}
        <div className="flex justify-center gap-2 h-full items-end w-full py-4">
          <div className="flex items-center w-full justify-start">
            {currentPage > 1 && (
              <button
                className="flex items-center gap-2   px-2"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft size={20} />
              </button>
            )}
          </div>

          <div className="flex gap-2 items-center">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`size-6 text-xs rounded-full  ${
                    currentPage === index + 1
                      ? "bg-black text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>

          <div className="flex items-center w-full justify-end">
            {currentPage <
              Math.ceil(filteredProducts.length / itemsPerPage) && (
              <button
                className="flex items-center gap-2   px-2"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSeller;
