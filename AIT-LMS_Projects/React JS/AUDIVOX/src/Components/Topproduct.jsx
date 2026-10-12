import React, { useState } from "react";
import Cards from "../Components/Cards";
import productsData from "../Components/Data/ProductsData";
import { NavLink } from "react-router-dom";

function Topproduct() {
  const [sortBy, setSortBy] = useState("All");

  // Filter products
  let filteredProducts = productsData;

  if (sortBy !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === sortBy
    );
  }

  // Show maximum 11 products
  filteredProducts = filteredProducts.slice(0, 11);

  return (
    <div className="Top_products mt-[80px]">
      <h1 className="text-center text-3xl font-semibold mb-[25px]">Top Products</h1>
      <div className="flex flex-wrap justify-center gap-[8px] px-[15px] mb-[20px]">
            <button onClick={() => setSortBy("All")} className={` cursor-pointer px-[15px] py-[7px] rounded-md transition duration-200 active:scale-95
            ${
              sortBy === "All"
                ? "bg-orange-500 text-white"
                : "hover:bg-orange-500 hover:text-white"}`}
        >All</button>
        <button onClick={() => setSortBy("Headphones")} className={`cursor-pointer px-[15px] py-[7px] rounded-md transition duration-200 active:scale-95
            ${
              sortBy === "Headphones"
                ? "bg-orange-500 text-white"
                : "hover:bg-orange-500 hover:text-white"}`}
        >Headphones</button>
        <button onClick={() => setSortBy("Earbuds")} className={` cursor-pointer px-[15px] py-[7px] rounded-md transition duration-200 active:scale-95
            ${
              sortBy === "Earbuds"
                ? "bg-orange-500 text-white"
                : "hover:bg-orange-500 hover:text-white"}`}
        >Earbuds</button>
        <button onClick={() => setSortBy("Earphones")} className={`cursor-pointer px-[15px] py-[7px] rounded-md transitionduration-200active:scale-95
            ${
              sortBy === "Earphones"
                ? "bg-orange-500 text-white"
                : "hover:bg-orange-500 hover:text-white"}`}
        >Earphones</button>
        <button onClick={() => setSortBy("Neckbands")} className={`cursor-pointer px-[15px] py-[7px] rounded-md transition duration-200 active:scale-95
            ${
              sortBy === "Neckbands"
                ? "bg-orange-500 text-white"
                : "hover:bg-orange-500 hover:text-white"}`}
        >Neckbands</button>
      </div>

      {/* Products */}
      <div className="px-[15px] sm:px-[30px] lg:px-[60px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] items-start">

          {filteredProducts.map((product) => (
            <Cards
              key={product.id}
              product={product}
            />
          ))}

          {/* Browse All */}
          <NavLink to="/products" className="w-full">
                <div className=" w-full -ml-[1px] max-w-[300px] h-[440px] border border-gray-700 rounded-md overflow-hidden flex flex-col items-center justify-center transition duration-300 hover:border-orange-500 hover:-translate-y-[5px] active:scale-95 cursor-pointer mx-auto">
                    <h1 className="text-3xl">Browse All</h1>
                    <h1 className="text-3xl">Products ⮞</h1>
                </div>
          </NavLink>
        </div>
      </div>
      
    </div>
  );
}

export default Topproduct;