import React from "react";
import { Star } from "lucide-react";

interface HorizontalServiceCardProps {
  name: string;
  avatar: string;
  mainImage: string;
  rating: number;
  service: string;
  price: number;
  priceUnit?: string;
  distance?: string;
  tasksCompleted?: number;
  onClick?: () => void;
  onBookNow?: () => void;
}

export const HorizontalServiceCard: React.FC<HorizontalServiceCardProps> = ({
  name,
  avatar,
  mainImage,
  rating,
  service,
  price,
  priceUnit = "/hr",
  distance,
  tasksCompleted,
  onClick,
  onBookNow,
}) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 w-full min-w-[415px] mx-auto"
      onClick={onClick}
    >
      <div className="flex h-full p-3 overflow-hidden min-h-[175px]">
        {/* Left Side - Main Image */}
        <div className="w-[150px] min-w-[120px] sm:w-[150px] h-[175px] flex-shrink-0">
          <img
            src={mainImage}
            alt={`${name} working`}
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="150" height="175" viewBox="0 0 150 175">
                  <rect width="150" height="175" fill="#f3f4f6"/>
                  <text x="75" y="87" text-anchor="middle" font-size="12" fill="#9ca3af">Image</text>
                </svg>
              `)}`;
            }}
          />
        </div>

        {/* Right Side - Details */}
        <div className="flex-1 flex flex-col px-3 sm:px-4 py-2 min-w-0">
          {/* Header Row - Avatar, Name, Rating */}
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={avatar}
                  alt={`${name}'s profile`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <rect width="32" height="32" fill="#f3f4f6"/>
                        <circle cx="16" cy="12" r="4" fill="#d1d5db"/>
                        <path d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="#d1d5db"/>
                      </svg>
                    `)}`;
                  }}
                />
              </div>
              <h2 className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                {name}
              </h2>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0 ml-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs sm:text-sm font-semibold text-gray-900">
                {rating}
              </span>
            </div>
          </div>

          {/* Service and Distance Row */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="text-xs sm:text-sm font-medium text-primary truncate flex-1">
              {service}
            </h3>
            {distance && (
              <span className="text-xs sm:text-sm text-[#8E8E93] font-normal ml-2 flex-shrink-0">
                {distance}
              </span>
            )}
          </div>

          {/* Price and Tasks Row */}
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="text-left">
              <span className="text-sm sm:text-base font-bold text-[#1E2B3A]">
                ₦{price.toLocaleString()}
                {priceUnit}
              </span>
            </div>
            {tasksCompleted && (
              <div className="text-right">
                <span className="text-xs sm:text-sm font-medium text-[#1E2B3A]">
                  {tasksCompleted} <span className="text-blue-400">tasks</span>
                </span>
              </div>
            )}
          </div>

          <div className="mt-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookNow?.();
              }}
              className="w-full bg-primary text-white text-xs sm:text-sm font-medium py-2 sm:py-2.5 rounded-md hover:bg-teal-600 transition-colors duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
