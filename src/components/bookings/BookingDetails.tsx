import { MapPin, Star, ArrowLeft } from "lucide-react";
import type { BookingCardProps } from "types/global";
import MainLayout from "../layouts/MainLayout";

interface BookingDetailsProps {
  booking: BookingCardProps;
  onBack: () => void;
  setCurrentView: () => void;
}

const BookingDetailsPage: React.FC<BookingDetailsProps> = ({
  booking,
  onBack,
  setCurrentView
}) => {
  const getDetailsButtons = () => {
    switch (booking.status) {
      case "Completed":
        return (
          <div className="p-6 space-y-3">
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
              Book again
            </button>
          </div>
        );
      case "Pending":
      case "Ongoing":
        return (
          <div className="p-6 space-y-3">
            <button className="w-full border border-[#1E2B3A] text-[#1E2B3A] py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Monitor {booking.providerName.split(" ")[1]}
            </button>
            <button className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors" onClick={() => setCurrentView("cancel")}>
              Cancel booking
            </button>
          </div>
        );
      case "Cancelled":
        return (
          <div className="p-6">
            <button className="w-full border border-red-300 text-red-600 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors">
              Report
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (booking.status) {
      case "Ongoing":
        return "In Progress";
      case "Completed":
        return "Completed";
      case "Pending":
        return "Pending";
      case "Cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case "Ongoing":
        return "bg-[#FBBC0433]/[20%] text-[#FBBC04]";
      case "Completed":
        return "bg-[#34A85333]/[20%] text-[#34A853]";
      case "Pending":
        return "bg-[#FBBC0433]/[20%] text-[#FBBC04] ";
      case "Cancelled":
        return "bg-[#EA4335] text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto pt-8 pb-4 mb-6 bg-white rounded-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#8E8E93] hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">
              {booking.title} Service
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#8E8E93]">Status:</span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
            >
              {getStatusText()}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-6">
          <div className="relative">
            <div className="flex justify-between mb-2">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 text-[#8E8E93] flex items-center justify-center text-sm font-medium">
                3
              </div>
            </div>
            <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 -z-10">
              <div className="h-full bg-teal-500 w-1/2"></div>
            </div>
          </div>
        </div>

        <div className="border border-dashed border-[#6CA0FE4D]/[30%] mx-6 rounded-md">
          <div className=" rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
              <img
                src={booking.serviceImage}
                alt={booking.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-teal-600 mb-3">
                  {booking.title}
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={booking.providerAvatar}
                    alt={booking.providerName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-900">
                    {booking.providerName}
                  </span>
                  <div className="rounded-full p-2">
                    <img
                      src="/icons/ICON7.png"
                      className="h-8 w-8"
                      alt="icon"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-[#8E8E93]">
                    {booking.location}
                  </span>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="text-sm text-gray-500">14hrs</div>
                <div className="rounded-full p-2">
                  <img src="/icons/ICON7.png" className="h-8 w-8" alt="icon" />
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-700">
                    {booking.rating}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6">
            <div className="flex justify-between items-center py-4 ">
              <span className="text-[#8E8E93]">Time/Date</span>
              <div className="text-right">
                <span className="font-semibold text-gray-900 mr-2">
                  {booking.date}
                </span>
                <span className="text-blue-500">{booking.time}</span>
              </div>
            </div>

            {/* Dotted horizontal line */}
            <div className="border-b border-dashed border-[#6CA0FE57]/[34%] my-4"></div>

            {/* Amount Row */}
            <div className="flex justify-between items-center py-4 ">
              <span className="text-[#8E8E93]">Amount</span>
              <span className="font-semibold text-gray-900">₦300,500</span>
            </div>

            {/* Charges Row */}
            <div className="flex justify-between items-center py-4 ">
              <span className="text-[#8E8E93]">Charges</span>
              <span className="font-semibold text-gray-900">₦5,500</span>
            </div>

            {/* Total Row */}
            <div className="flex justify-between items-center py-4">
              <span className="text-[#8E8E93]">Total</span>
              <span className="font-semibold text-gray-900">₦305,000</span>
            </div>
          </div>
        </div>

        {getDetailsButtons()}
      </div>
    </MainLayout>
  );
};

export default BookingDetailsPage;
