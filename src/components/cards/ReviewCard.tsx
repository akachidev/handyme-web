import React from "react";
import { Star } from "lucide-react";
import type { Review } from "types/global";

export const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="w-4 h-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    return stars;
  };

  return (
    <div className="bg-white border border-gray-100 rounded-lg p-4  transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100">
            <img
              src={review.customerAvatar}
              alt={review.customerName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-900 text-sm">
            {review.customerName}
          </span>
        </div>

        <div className="flex items-center gap-1">
          {renderStars(review.rating)}
          <span className="text-sm font-medium text-[#6CA0FE] ml-1">
            {review.rating}
          </span>
        </div>
      </div>

      <p className="text-[#2C2C2E] text-[14px] font-medium mb-4 py-2">
        {review.review}
      </p>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="text-[#1C1C1E]">{review.location}</span>
        <span>{review.date}</span>
      </div>
    </div>
  );
};
