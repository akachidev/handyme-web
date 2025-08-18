import React from "react";
import { Star } from "lucide-react";

interface ServiceProviderCardProps {
  id?: string;
  name: string;
  avatar: string;
  rating: number;
  service: string;
  price: number;
  priceUnit?: string;
  isVerified?: boolean;
  onClick?: () => void;
}

export const ServiceProviderCard: React.FC<ServiceProviderCardProps> = ({
  name,
  avatar,
  rating,
  service,
  price,
  priceUnit = "/hr",
  isVerified = false,
  onClick,
}) => {
  return (
    <div
      className="bg-[#FFFFFF] rounded-xl border-[2px] border-[#00C2A81A]/[10%] text-center cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between "
      style={{ padding: "24px" }}
      onClick={onClick}
    >
      {/* Avatar with Verification Badge */}
      <div className="flex justify-center mb-3">
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src={avatar}
              alt={`${name}'s profile`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
                    <rect width="64" height="64" fill="#f3f4f6"/>
                    <circle cx="32" cy="24" r="8" fill="#d1d5db"/>
                    <path d="M14 52c0-10 8-18 18-18s18 8 18 18" fill="#d1d5db"/>
                  </svg>
                `)}`;
              }}
            />
          </div>

          {isVerified && (
            <div className="absolute -bottom-0 -right-0 w-5 h-5  rounded-full flex items-center justify-center bg-white ">
              <img src="/icons/verify.png" className="w-5 h-5 " alt="verify" />
            </div>
          )}
        </div>
      </div>

      <h2 className="text-[17px] font-bold text-[#1E2B3A] mb-1 leading-tight">
        {name}
      </h2>

      {isVerified && (
        <div className="mb-2">
          <span className="text-primary font-medium text-base">Verified</span>
        </div>
      )}

      <p className="text-[#8E8E93] text-base font-normal mb-4 leading-relaxed">
        {service}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="text-left">
          <span className="text-[17px] font-bold text-[#1E2B3A]">
            ₦{price.toLocaleString()}
            {priceUnit}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="text-[17px] font-bold text-[#1E2B3A]">{rating}</span>
        </div>
      </div>
    </div>
  );
};
