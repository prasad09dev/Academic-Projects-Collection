import React from "react";
import { IoPersonCircleSharp } from "react-icons/io5";

function Review({ review }) {
  return (
    <div className="w-full py-[20px] border-b border-black dark:border-gray-800">

      {/* Top Section */}
      <div className="flex items-center gap-[15px]">

        {/* Profile Icon */}
        <IoPersonCircleSharp className="text-[65px] text-black dark:text-gray-300 shrink-0" />

        {/* Name + Rating + Date */}
        <div>
          
          {/* Name */}
          <h2 className="text-lg sm:text-xl font-bold text-black dark:text-gray-300">
            {review.name}
          </h2>

          {/* Rating + Date */}
          <div className="flex items-center gap-[10px] mt-[5px]">

            {/* Stars */}
            <span className="text-orange-500 text-[18px] tracking-[2px]">
              {"★".repeat(review.rateCount)}
            </span>

            {/* Separator */}
            <span className="dark:text-gray-400 text-black text-[20px]">
              |
            </span>

            {/* Date */}
            <span className="dark:text-gray-400 text-black text-[16px]">
              {review.date}
            </span>

          </div>
        </div>

      </div>

      {/* Review Text */}
      <p className="dark:text-gray-300 text-black text-[17px] mt-[15px] leading-relaxed">
        {review.review}
      </p>

    </div>
  );
}

export default Review;