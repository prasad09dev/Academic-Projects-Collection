import React, { useEffect, useState } from "react";
import productsData from "../Components/Data/ProductsData";
import { NavLink } from "react-router-dom";

function FeaturedProducts() {

  const featuredProducts = productsData.filter((product) => product.tag === "featured-product");

  const productCount = featuredProducts.length;

  const sliderProducts = [
    ...featuredProducts,
    ...featuredProducts,
    ...featuredProducts,
  ];

  // Start with 3rd product in the center
  const [current, setCurrent] = useState(productCount + 2);

  const [isMoving, setIsMoving] = useState(true);

  /* ================= AUTOMATIC SLIDING ================= */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);


  /* ================= INFINITE LOOP ================= */
  const handleTransitionEnd = () => {

    // Reached end of third copy
    if (current >= productCount * 2 + 2) {
      setIsMoving(false);
      setCurrent(productCount + 2);
      setTimeout(() => {
        setIsMoving(true);
      }, 50);
    }

    // Reached beginning
    if (current <= 2) {
      setIsMoving(false);
      setCurrent(productCount + 2);
      setTimeout(() => {
        setIsMoving(true);
      }, 50);
    }
  };

  /* ================= EMPTY DATA ================= */
  if (productCount === 0) {
    return null;
  }


  return (
    <section className="mt-[80px] overflow-hidden mb-[150px]">

      {/* ================= HEADING ================= */}
      <h1 className="text-center text-3xl font-bold mb-[40px]">
        Featured Products
      </h1>

      {/* ================= CAROUSEL ================= */}
      <div className="relative w-full overflow-hidden h-[400px] mt-[50px]">

        {/* TRACK */}
        <div onTransitionEnd={handleTransitionEnd} className={`flex items-center w-max
            ${isMoving
              ? "transition-transform duration-700 ease-in-out"
              : ""
            }
          `}
          style={{ transform: `translateX(calc(50vw - ${current * 260 + 130
            }px))`,
          }}>
          {sliderProducts.map((product, index) => {

            // Current center product
            const isCenter = index === current;


            return (
              <div key={`${product.id}-${index}`} className="w-[260px] shrink-0 flex flex-col items-center justify-center">

                {/* ================= PRODUCT NAME ================= */}
                <h2 className={`text-center whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px] transition-all duration-700
                    ${
                      isCenter
                        ? "text-[22px]"
                        : "text-[15px]"
                    }
                  `}>
                    {product.title}
                </h2>

                {/* ================= PRODUCT IMAGE ================= */}
                <div className={`flex items-center justify-center transition-all duration-700
                    ${
                      isCenter
                        ? "w-[300px] h-[300px] scale-100"
                        : "w-[220px] h-[220px] scale-90 opacity-60"
                    }
                  `}><NavLink to={`/products/${product.id}`}>
                        <img src={product.images[0]} alt={product.title}
                              className="w-full h-full object-contain select-none pointer-events-none"/>
                      </NavLink>
                </div>

                {/* ================= PRICE ================= */}
                <div className="flex items-center justify-center gap-[10px] mt-[10px]">
                    <span className={`font-bold transition-all duration-700
                      ${
                        isCenter
                          ? "text-[30px]"
                          : "text-[20px]"
                      }
                    `}>
                        ₹{product.finalPrice.toLocaleString("en-IN")}
                    </span>

                  <span className="text-gray-500 line-through text-[14px]">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

              </div>
            );
          })}

        </div>
      </div>

      {/* ================= DOTS ================= */}

      <div className="flex justify-center items-center gap-[8px] mt-[50px]">
        {featuredProducts.map((_, index) => (
          <button key={index} onClick={() => {
              setIsMoving(true);
              setCurrent(productCount + 2 + index);
            }}
            className={`h-[8px] rounded-full transition-all duration-300 cursor-pointer
              ${
                current % productCount === index
                  ? "w-[25px] bg-orange-500"
                  : "w-[8px] bg-gray-500"
              }
            `}/>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;