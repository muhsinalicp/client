import React, { useState } from "react";
import { VscSettings } from "react-icons/vsc";

function Filter() {
  const [data, setData] = useState([]);

  return (
    <section className="border p-4 w-full rounded-xl border-gray-300">
      <div className="flex justify-between items-center py-2 border-b-1 border-gray-200">
        <h1 className="font-semibold">Filter</h1>
        <VscSettings size={20} />
      </div>

      <div className="border-b-1 border-gray-200 pb-2">
        <h1 className="py-2 font-semibold">Category</h1>
        <div className="flex flex-col gap-1">
          <div className="">
            <input type="checkbox" id="check1" />
            <label htmlFor="check1">
              <span></span>
              Accept terms
            </label>
          </div>
        </div>
      </div>

      <button className="bg-black text-white px-14 mt-4 py-3 rounded-4xl  hover:transform hover:scale-102 duration-200 cursor-pointer">
        Apply Filter
      </button>
    </section>
  );
}

export default Filter;
