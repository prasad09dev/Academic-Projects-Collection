import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import productsData from "../Components/Data/ProductsData";

function Carousel() {

    // Get only hero products
    const heroProducts = productsData.filter((product) => product.tag === "hero-product");

    const [currentIndex, setCurrentIndex] = useState(0);

    // Next slide
    const nextSlide = () => {
        setCurrentIndex((prev) => prev === heroProducts.length - 1 ? 0 : prev + 1);
    };

    // Previous slide
    const previousSlide = () => {
        setCurrentIndex((prev) => prev === 0 ? heroProducts.length - 1 : prev - 1);
    };

    // Automatic slide
    useEffect(() => { const interval = setInterval(() => { nextSlide(); }, 4000);

        return () => clearInterval(interval);
    }, [heroProducts.length]);

    // If there are no hero products
    if (heroProducts.length === 0) {
        return null;
    }

    const product = heroProducts[currentIndex];

    return (
        <div className="w-full px-[15px] sm:px-[30px] lg:px-[60px] mt-[30px] mb-[150px]">

            {/* Carousel */}
            <div className="relative w-full min-h-[380px] sm:min-h-[400px] lg:min-h-[450px] rounded-xl overflow-hidden">

                {/* Product Content */}
                <div className=" w-full min-h-[380px] sm:min-h-[400px] lg:min-h-[450px] flex flex-col md:flex-row items-center justify-between px-[25px] sm:px-[40px] lg:px-[70px] py-[30px]">
                    <h1 className="absolute -left-[5px] top-[70px] text-[200px] font-bold uppercase text-black/[0.03] dark:text-white/[0.03] whitespace-nowrap pointer-events-none select-none z-0">
                        {product.type}
                    </h1>
                    {/* Left Content */}
                    <div className="w-full md:w-[60%] text-center md:text-left order-2 md:order-1">
                        <h1 className="text-lg font-medium mb-[8px]">{product.title}</h1>
                        <p className="text-2xl sm:text-4xl lg:text-7xl font-bold mb-[12px]">{product.tagline}</p>

                        {/* Price */}
                        <div className="flex justify-center md:justify-start items-center gap-[10px] mb-[20px]">
                            <span className="text-4xl font-bold">
                                ₹{product.finalPrice.toLocaleString("en-IN")}
                            </span>

                            <span className="text-gray-500 text-2xl line-through">
                                ₹{product.originalPrice.toLocaleString("en-IN")}
                            </span>
                        </div>

                        {/* Button */}
                        <NavLink to={product.path}>
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-[25px] py-[10px] rounded-md cursor-pointer active:scale-95 transition duration-200">
                                Shop Now
                            </button>
                        </NavLink>
                    </div>

                    {/* Product Image */}
                    <div className="w-full md:w-[50%] h-[180px] sm:h-[220px] lg:h-[500px] flex items-center justify-center order-1 md:order-2 z-1">
                        <NavLink to={`/products/${product.id}`}>
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-full object-contain transition duration-500 hover:scale-105"
                                />
                        </NavLink>
                    </div>
                </div>

                {/* Dots */}
                <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex gap-[8px]">
                    {heroProducts.map((product, index) => (
                    <button key={product.id} onClick={() => setCurrentIndex(index)}
                        className={`h-[8px] rounded-full transition-all duration-300 cursor-pointer
                        ${
                            currentIndex === index
                            ? "w-[25px] bg-orange-500"
                            : "w-[8px] bg-gray-400"
                        }`}/>
                    ))}
                </div>
            </div>
        </div>
        );
    }

export default Carousel;