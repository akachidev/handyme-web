import React from "react";
import { Star } from "lucide-react";

interface TopRatedCardProps {
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
}

export const TopRatedCard: React.FC<TopRatedCardProps> = ({
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
}) => {
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 "
      onClick={onClick}
    >
      <div className="relative">
        <div className="w-full h-full p-3">
          <img
            src={mainImage}
            alt={`${name} working`}
            className="w-full h-full object-cover rounded-md"
            onError={(e) => {
              e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
                <svg xmlns="http://www.w3.org/2000/svg" width="310" height="160" viewBox="0 0 310 160">
                  <rect width="310" height="160" fill="#f3f4f6"/>
                  <text x="155" y="80" text-anchor="middle" font-size="14" fill="#9ca3af">Image</text>
                </svg>
              `)}`;
            }}
          />
        </div>

        <div className="absolute top-4 right-4">
          <div className="bg-white rounded-md px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-[12px] font-semibold text-[#2C2C2E]">
              {rating}
            </span>
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="bg-teal-50 rounded-xl px-4 py-2.5 text-center">
          <h3 className="text-lg font-medium text-primary">{service}</h3>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
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
            <h2 className="text-[16px] font-normal text-[#8E8E93]">{name}</h2>
          </div>

          {distance && (
            <span className="text-sm font-normal text-[#2C14DD]">
              {distance}
            </span>
          )}
        </div>

        {/* Price and Tasks Row */}
        <div className="flex items-center justify-between">
          <div className="text-left">
            <span className="text-[17px] font-bold text-[#1E2B3A]">
              ₦{price.toLocaleString()}
              {priceUnit}
            </span>
          </div>

          {tasksCompleted && (
            <div className="text-right">
              <span className="text-sm font-normal text-[#1E2B3A]">
                {tasksCompleted} <span className="text-blue-400">tasks</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
