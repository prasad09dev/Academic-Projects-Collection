import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { addToCart, getCart } from "../Utils/cart";

function Cards({ product }) {

  const [isAdded, setIsAdded] = useState(false);

  // Check localStorage when card loads
  useEffect(() => {
    const cart = getCart();

    const exists = cart.some(
      (item) => item.id === product.id
    );

    setIsAdded(exists);
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart(product.id, 1);

    // Change this particular button to green
    setIsAdded(true);
  };

  const discount = Math.round(
    ((product.originalPrice - product.finalPrice) /
      product.originalPrice) * 100
  );

  return (
    <div className="w-full max-w-[300px] h-fit pt-[20px] border border-gray-700 rounded-md overflow-hidden">

      {/* Product Image */}
     <NavLink to={`/products/${product.id}`}>
        <div className="w-full h-[200px] flex items-center justify-center">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-contain hover:scale-110"
          />
        </div>
      </NavLink>

      {/* Product Details */}
      <div className="pb-[10px] pr-[10px] pl-[10px]">

        {/* Rating */}
        <div className="text-orange-500 text-[18px] mb-[5px]">
          {"★".repeat(product.rateCount)}
        </div>

        {/* Product Name */}
        <h2 className=" text-[18px] font-semibold">
          {product.title}
        </h2>

        {/* Product Info */}
        <p className="text-sm mt-[5px] min-h-[32px]">
          {product.info}
        </p>

        <hr className="border-gray-700 my-[2px]" />

        {/* Price */}
        <div className="flex items-center gap-[10px]">

          <span className=" text-2xl font-bold">
            ₹{product.finalPrice.toLocaleString("en-IN")}
          </span>

          <span className="text-gray-400 text-based line-through">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>

        </div>

        {/* Discount */}
        <p className="text-green-700 text-sm mt-[5px]">
          {discount}% OFF
        </p>

        {/* Add to Cart */}
        <button onClick={handleAddToCart} className={`w-full mt-[12px] py-[9px] text-sm rounded-md text-white transition active:scale-95 ${
            isAdded
              ? "bg-green-600 hover:bg-green-700"
              : "bg-orange-500 hover:bg-orange-600"
          }`}>
          <h1 className="hover:scale-120">{isAdded ? "Added to Cart" : "Add to Cart"}</h1></button>

      </div>
    </div>
  );
}

export default Cards;