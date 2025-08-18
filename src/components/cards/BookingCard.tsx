import { MapPin, Star } from "lucide-react";
import type { BookingCardProps } from "types/global";

const BookingCard: React.FC<BookingCardProps> = ({
  title,
  price,
  providerName,
  providerAvatar,
  serviceImage,
  location,
  rating,
  date,
  time,
  status,
  onClick,
}) => {
  const getStatusButtons = (status: string) => {
    switch (status) {
      case "Ongoing":
        return (
          <div className="mt-4">
            <div className="bg-[#FBBC0433]/[20%] text-[#FBBC04] py-3 text-center rounded-lg font-medium">
              Ongoing
            </div>
          </div>
        );
      case "Completed":
        return (
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-[#34A85333]/[20%] text-[#34A853] py-3 rounded-lg font-medium hover:bg-green-200 transition-colors">
              Completed
            </button>
            <button className="flex-1 bg-[#34A853] text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
              Book again
            </button>
          </div>
        );
      case "Pending":
        return (
          <div className="flex gap-3 mt-4">
            <button className="flex-1 border border-[#1E2B3A] text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Monitor Kennedy
            </button>
            <button className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors">
              Cancel booking
            </button>
          </div>
        );
      case "Cancelled":
        return (
          <div className="mt-4">
            <button className="w-full border border-red-300 text-red-600 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors">
              Report
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="flex items-center p-4 gap-4">
          <img
            src={serviceImage}
            alt={title}
            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 text-base truncate">
                {title}
              </h3>
              <span className="text-lg font-bold text-gray-900 ml-2">
                ₦{price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <img
                src={providerAvatar}
                alt={providerName}
                className="w-6 h-6 rounded-full object-cover flex-shrink-0"
              />
              <span className="text-gray-700 text-sm font-medium truncate">
                {providerName}
              </span>
              <div className=" rounded-full p-0.5 flex-shrink-0">
                <img src="/icons/ICON7.png" alt="" />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1 text-gray-600 truncate">
                <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" />
                <span className="truncate">{location}</span>
              </div>
              <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="font-medium text-gray-700">{rating}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100 px-4 py-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Time/Date</span>
            <div className="text-right">
              <span className="font-medium text-gray-900">{date}</span>
              <span className="text-blue-500 ml-2">{time}</span>
            </div>
          </div>
          {getStatusButtons(status)}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex items-start p-4 gap-3">
          <img
            src={serviceImage}
            alt={title}
            className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-[16px] font-semibold text-[#00C2A8]">
                {title}
              </h3>
              <span className="text-xl font-bold text-gray-900 ml-4">
                ₦{price.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center gap-3 mb-4">
              <div className="flex gap-2">
                <img
                  src={providerAvatar}
                  alt={providerName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="text-gray-900 font-medium">
                  {providerName}
                </span>
              </div>
              <div className=" rounded-full p-0.5 flex-shrink-0">
                <img src="/icons/ICON7.png" alt="icon" className="h-8 w-8" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#8E8E93] font-medium">
                <MapPin className="w-4 h-4 text-red-500" />
                <span className="text-sm">{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium text-gray-700">{rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width horizontal line */}
        <div className="border-t border-gray-100"></div>

        {/* Full-width Time/Date section */}
        <div className="px-6 py-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#8E8E93] font-medium">Time/Date</span>
            <div className="text-right">
              <span className="font-semibold text-gray-900 mr-2">{date}</span>
              <span className="text-blue-500">{time}</span>
            </div>
          </div>
        </div>

        {/* Full-width CTA buttons */}
        <div className="px-6 pb-6">{getStatusButtons(status)}</div>
      </div>
    </div>
  );
};

export default BookingCard;
