import React from "react";
import { useParams } from "react-router-dom";
import ProductContainer from "./ProductContainer";

function Products({ data, totalPages }) {
  const { page, category, price, rating } = useParams();

  return (
    <div className="w-full h-full rounded-xl flex flex-col gap-4 justify-between">
      <div className="head-font text-3xl">
        {category === "all" ? "All Products" : category}
      </div>
      <div className="flex flex-col gap-4 h-full ">
        <ProductContainer data={data} />
      </div>

      <div>{totalPages}</div>
    </div>
  );
}

export default Products;
