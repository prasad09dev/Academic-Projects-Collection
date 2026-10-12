import React, { useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import productsData from "../Components/Data/ProductsData";
import Cards from "../Components/Cards";
import Review from '../Components/Review'
import ReviewsData from '../Components/Data/ReviewsData'
import { addToCart } from "../Utils/cart";

function Productdetails() {

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
  };

  const [activeTab, setActiveTab] = useState("specification");

  const { id } = useParams();

  // Find product from productsData
  const product = productsData.find(
    (item) => String(item.id) === String(id)
  );

  let reviewdata = ReviewsData;

  const [selectedImage, setSelectedImage] = useState(0);

  let filteredProducts = productsData;

  filteredProducts = filteredProducts.filter((item) => item.category === product.category);

  // If product doesn't exist
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-[20px]">

        <h1 className="text-3xl font-bold text-gray-300">
          Product Not Found
        </h1>

        <p className="text-gray-500 mt-[10px]">
          The product you are looking for doesn't exist.
        </p>

        <NavLink  to="/products" className="mt-[20px] px-[25px] py-[10px] bg-red-500 hover:bg-red-600 active:scale-95 text-white rounded-md transition">
          Back to Products
        </NavLink>
      </div>
    );
  }


  // Discount calculation
  const discount = Math.round(
    ((product.originalPrice - product.finalPrice) /
      product.originalPrice) *
      100
  );


  return (

    <section className="min-h-screen px-[20px] sm:px-[30px] lg:px-[60px] py-[30px]">

      {/* ================= PRODUCT AREA ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_1fr] gap-[25px] lg:gap-[35px] max-w-[1600px] mx-auto">
        {/* LEFT : THUMBNAILS */}
        <div className="flex lg:flex-col flex-row gap-[15px] lg:gap-[25px] justify-center lg:justify-start overflow-x-auto lg:overflow-visible order-2 lg:order-1">
          {product.images.map((image, index) => (
            <button key={index} onClick={() => setSelectedImage(index)} className={`shrink-0 w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] border rounded-md flex items-center justify-center overflow-hidden transition-all duration-300
                ${
                  selectedImage === index
                    ? "border-gray-200 scale-105"
                    : "border-gray-700 opacity-60 hover:opacity-100 hover:border-gray-400"
                }
              `}
            >
              <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-contain p-[5px]"/>
            </button>
          ))}
        </div>

        {/* CENTER : MAIN PRODUCT IMAGE */}
        <div className="order-1 lg:order-2 min-h-[400px] sm:min-h-[500px] lg:min-h-[650px] flex items-center justify-center overflow-hidden">
          <img src={product.images[selectedImage]} alt={product.title} className="w-full h-full max-h-[650px] object-contain select-none transition-all duration-500 hover:scale-[1.03]"/>
        </div>
      
        {/* RIGHT : PRODUCT INFORMATION */}
        <div className="order-3 flex flex-col justify-start">
          {/* PRODUCT TITLE */}
          <h1 className="text-3xl sm:text-3xl lg:text-[42px] font-bold leading-tight">
            {product.title}
          </h1>
          {/* PRODUCT INFO */}
          <p className=" text-lg mt-[12px]">
            {product.info}
          </p>
          {/* RATING */}
          <div className="flex items-center gap-[8px] mt-[20px]">
            <span className="text-orange-500 text-[18px] tracking-[2px]">{"★".repeat(product.rateCount)}</span>
            <span className="text-gray-600">|</span>
            <span>{product.ratings} Ratings</span>
          </div>

          <div className="border-t border-gray-800 my-[30px]" />
          
          {/* DIVIDER */}
          <div className="flex justify-between p-[10px]">
            <div className="">  
            {/* PRICE */}
            <div className="flex items-center gap-[20px] flex-wrap">
              <span className="text-4xl font-bold">
                ₹{product.finalPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            {/* SAVINGS */}
            <p className="text-green-500 text-lg mt-[15px] font-bold">
              You save: ₹
              {(product.originalPrice - product.finalPrice).toLocaleString("en-IN")}
              {" "}
              ({discount}%)
            </p>
            <p className="text-lg mt-[8px]">
              (Inclusive of all taxes)
            </p>
            </div>
            {/* STOCK */}
            <div className="mt-[25px]">
              <span className="inline-flex items-center gap-[7px] px-[15px] py-[9px] bg-green-600 hover:bg-green-500 rounded-md text-white font-medium transition">
                ✓ In Stock
              </span>
            </div>
          </div>
          {/* DIVIDER */}

          <div className="border-t border-gray-800 my-[30px]" />
          
          {/* OFFERS */}
          <h2 className="text-xl font-semibold">
            Offers and Discounts
          </h2>

          <div className="flex flex-wrap gap-[12px] mt-[20px]">
            <div className="border border-gray-600 rounded-md px-[15px] py-[12px] hover:border-gray-400 transition">
              No Cost EMI on Credit Card
            </div>

            <div className="border border-gray-600 rounded-md px-[15px] py-[12px] hover:border-gray-400 transition">
              Pay Later & Avail Cashback
            </div>
          </div>

          {/* DIVIDER */}
          <div className="border-t border-gray-800 my-[30px]" />
          {/* ADD TO CART */}
          <button onClick={handleAddToCart} className="w-1/2 py-[15px] bg-orange-600 hover:bg-orange-500 active:scale-[0.98] rounded-md text-lg font-semibold text-white transition-all duration-200 cursor-pointer">
            Add to Cart
          </button>

        </div>
      </div>
      

      <div className="w-full mt-[100px]">
      {/* Buttons */}
      <div className="flex gap-[10px] border-b border-black  dark:border-white">
        <button onClick={() => setActiveTab("specification")} className={`px-[20px] py-[10px] cursor-pointer
            ${
              activeTab === "specification"
                ? "text-white border-b-2 border-orange-500 bg-orange-500 rounded-full font-bold"
                : "dark:text-white text-black hover:bg-orange-500 hover:text-white hover:rounded-full font-bold"
            }
          `}
        >Specification</button>

        <button onClick={() => setActiveTab("overview")} className={` px-[20px] py-[10px] cursor-pointer
            ${
              activeTab === "overview"
                ? "text-white border-b-2 border-orange-500 bg-orange-500 rounded-full font-bold"
                : "dark:text-white text-black hover:bg-orange-500 hover:text-white hover:rounded-full font-bold"
            }
          `}
        >Overview</button>


        <button onClick={() => setActiveTab("reviews")} className={`px-[20px] py-[10px] cursor-pointer
            ${
              activeTab === "reviews"
                ? "text-white border-b-2 border-orange-500 bg-orange-500 rounded-full font-bold"
                : "dark:text-white text-black hover:bg-orange-500 hover:text-white hover:rounded-full font-bold"
            }
          `}
        >Reviews</button>
      </div>

      {/* Specifiction */}
      <div className="h-[300px] pt-[30px]">
        {activeTab === "specification" && (
          <div className="flex mt-[20px]">
            <div className="text-2xl">
              <h1 className="mb-[10px]">Brand</h1>
              <h1 className="mb-[10px]">Model</h1>
              <h1 className="mb-[10px]">Generic Name</h1>
              <h1 className="mb-[10px]">Headphone type</h1>
              <h1 className="mb-[10px]">Connectivity</h1>
              <h1>Microphone</h1>
            </div>
            <div className="ml-[50px] text-2xl">
              <p className="mb-[10px]">:</p>
              <p className="mb-[10px]">: </p>
              <p className="mb-[10px]">:</p>
              <p className="mb-[10px]">:</p>
              <p className="mb-[10px]">:</p>
              <p>:</p>
            </div>
            <div className="ml-[50px] text-2xl">
              <p className="mb-[10px]">{product.brand}</p>
              <p className="mb-[10px]">{product.title}</p>
              <p className="mb-[10px]">{product.category}</p>
              <p className="mb-[10px]">{product.type}</p>
              <p className="mb-[10px]">{product.connectivity}</p>
              <p>Yes</p>
            </div>
          </div>
        )}

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="h-[300px]">
            <h2 className="text-3xl font-bold">
              The <span className="text-orange-500">{product.title}</span> In-Ear <span className="">{product.connectivity}</span> Earpjones provides with fabulous sound quality
            </h2>
              <div className="m-[30px] text-lg">
                <p className="mb-[10px]">.Sound Tuned to Perfection</p>
                <p className="mb-[10px]">.Comfortable to Wear</p>
                <p>.Long Hours Playback Time</p>
              </div>
              <p className="text-xl ">Buy the <span className="font-bold text-orange-500">{product.title}</span> In-Ear Wired Earphones which offers you with fabulous music experience by providing you with awesome sound quality that you can never move on from. Enjoy perfect flexibility and mobility with amazing musical quality with these Earphones giving you a truly awesome audio experience. It blends with exceptional sound quality and a range of smart features for an unrivalled listening experience.</p>
          </div>
        )}

        {/* Reviews */}
        {activeTab === "reviews" && (
          <div className="px-[15px] sm:px-[30px] lg:px-[60px]">

            <div className="h-[350px] overflow-y-auto pr-[15px]">

              <div className="grid grid-cols-1 gap-[5px]">

                {reviewdata.map((review) => (
                  <Review
                    key={review.id}
                    review={review}
                  />
                ))}

              </div>

            </div>

          </div>
        )}
      </div>

    </div>
    

    {/* Suggetion */}
    <div className="px-[15px] sm:px-[30px] lg:px-[60px] mt-[200px]">
        <h1 className="text-center text-3xl mb-[50px]">Related Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] items-start">

          {filteredProducts.map((product) => (
            <Cards
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>

    </section>
  );
}

export default Productdetails;