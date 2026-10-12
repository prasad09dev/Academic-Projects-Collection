import React from "react";

// Icons
import { FaTruckFast } from "react-icons/fa6";
import { FaShieldAlt } from "react-icons/fa";
import { FaTags } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";

function Ouradvantages() {
  return (
    <div className="mt-[100px] md:mt-[150px] px-[20px] mb-[100px]">
      <h1 className="text-center text-3xl font-semibold mb-[40px]">
        Our Advantages
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[25px] max-w-[1200px] mx-auto">
        
        {/* Express Delivery */}
        <div className="flex items-center gap-[15px] p-[15px] rounded-md transition duration-300 hover:-translate-y-[5px] active:scale-95">
          <FaTruckFast className="text-3xl text-orange-500 shrink-0" />
          <div>
            <h1 className="text-lg font-medium">
              Express Delivery
            </h1>
            <p className="text-sm text-gray-500 mt-[3px]">
              Ships in 24 Hours
            </p>
          </div>
        </div>

        {/* Brand Warranty */}
        <div className="flex items-center gap-[15px] p-[15px] rounded-md transition duration-300 hover:-translate-y-[5px] active:scale-95">
          <FaShieldAlt className="text-3xl text-orange-500 shrink-0" />
          <div>
            <h1 className="text-lg font-medium">
              Brand Warranty
            </h1>
            <p className="text-sm text-gray-500 mt-[3px]">
              100% Original products
            </p>
          </div>
        </div>

        {/* Exciting Deals */}
        <div className="flex items-center gap-[15px] p-[15px] rounded-md transition duration-300 hover:-translate-y-[5px] active:scale-95">
          <FaTags className="text-3xl text-orange-500 shrink-0" />
          <div>
            <h1 className="text-lg font-medium">
              Exciting Deals
            </h1>
            <p className="text-sm text-gray-500 mt-[3px]">
              On all prepaid orders
            </p>
          </div>
        </div>

        {/* Secure Payments */}
        <div className="flex items-center gap-[15px] p-[15px] rounded-md transition duration-300 hover:-translate-y-[5px] active:scale-95">
          <FaCreditCard className="text-3xl text-orange-500 shrink-0" />
          <div>
            <h1 className="text-lg font-medium">
              Secure Payments
            </h1>
            <p className="text-sm text-gray-500 mt-[3px]">
              SSL/Secure certificate
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Ouradvantages;