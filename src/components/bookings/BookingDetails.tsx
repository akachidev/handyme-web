import { MapPin, Star, ArrowLeft } from "lucide-react";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Monitor from "../modals/MonitorModal";

interface BookingCardProps {
  title: string;
  providerName: string;
  location: string;
  date: string;
  time: string;
  status: "Ongoing" | "Completed" | "Pending" | "Cancelled";
  serviceImage: string;
  providerAvatar: string;
  rating: number;
}

interface BookingDetailsProps {
  booking: BookingCardProps;
  onBack: () => void;
  setCurrentView: React.Dispatch<
    React.SetStateAction<"list" | "details" | "cancel">
  >;
}

const BookingDetailsPage: React.FC<BookingDetailsProps> = ({
  booking,
  onBack,
  setCurrentView,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const getDetailsButtons = () => {
    switch (booking.status) {
      case "Completed":
        return (
          <div className="p-4 lg:p-6 space-y-3">
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors">
              Book again
            </button>
          </div>
        );
      case "Pending":
      case "Ongoing":
        return (
          <div className="p-4 lg:p-6 space-y-3">
            <button
              className="w-full border border-[#1E2B3A] text-[#1E2B3A] py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              onClick={() => setOpenModal(true)}
            >
              Monitor {booking.providerName.split(" ")[1]}
            </button>
            <button
              className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
              onClick={() => setCurrentView("cancel")}
            >
              Cancel booking
            </button>
          </div>
        );
      case "Cancelled":
        return (
          <div className="p-4 lg:p-6">
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
        return "bg-[#FBBC0433]/[20%] text-[#FBBC04]";
      case "Cancelled":
        return "bg-[#EA4335] text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 lg:bg-transparent lg:max-w-7xl lg:mx-auto lg:pt-8 lg:pb-4 lg:mb-6">
        <div className="bg-white lg:rounded-md">
          {/* Header */}
          <div className="flex items-center justify-between p-4 lg:p-6 ">
            <div className="flex items-center gap-2 lg:gap-4 flex-1 min-w-0">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-[#8E8E93] hover:text-gray-800 transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">
                  Back
                </span>
              </button>
              <h1 className="text-base lg:text-lg font-semibold text-gray-900 truncate">
                {booking.title} Service
              </h1>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              <span className="text-xs lg:text-sm text-[#8E8E93] hidden sm:inline">
                Status:
              </span>
              <span
                className={`px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium ${getStatusColor()}`}
              >
                {getStatusText()}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="border border-dashed border-[#6CA0FE4D]/[30%] mx-4 lg:mx-6 rounded-md mb-4 lg:mb-0">
            {/* Service Info */}
            <div className="rounded-lg p-4 lg:p-6 mb-4 lg:mb-6">
              <div className="flex items-start gap-3 lg:gap-4">
                <img
                  src={booking.serviceImage}
                  alt={booking.title}
                  className="w-16 h-16 lg:w-28 lg:h-28 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base lg:text-lg font-semibold text-[#00C2A8] mb-2 lg:mb-3">
                    {booking.title}
                  </h3>
                  <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                    <img
                      src={booking.providerAvatar}
                      alt={booking.providerName}
                      className="w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <span className="font-medium text-gray-900 text-sm lg:text-base truncate">
                      {booking.providerName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-red-500 flex-shrink-0" />
                    <span className="text-xs lg:text-sm text-[#8E8E93] truncate">
                      {booking.location}
                    </span>
                  </div>
                </div>
                <div className="text-right space-y-1 lg:space-y-2 flex-shrink-0">
                  <div className="text-xs lg:text-sm text-gray-500">14hrs</div>
                  <div className="rounded-full p-2">
                    <img
                      src="/icons/ICON7.png"
                      className="h-8 w-8"
                      alt="icon"
                    />
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400 fill-current" />
                    <span className="text-xs lg:text-sm font-medium text-gray-700">
                      {booking.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 lg:px-6 pb-4 lg:pb-6">
              <div className="flex justify-between items-center py-3 lg:py-4">
                <span className="text-sm lg:text-base text-[#8E8E93]">
                  Time/Date
                </span>
                <div className="text-right">
                  <div className="font-semibold text-gray-900 text-sm lg:text-base">
                    {booking.date}
                  </div>
                  <div className="text-blue-500 text-sm lg:text-base">
                    {booking.time}
                  </div>
                </div>
              </div>

              {/* Dotted Line */}
              <div className="border-b border-dashed border-[#6CA0FE57]/[34%] my-2 lg:my-4"></div>

              {/* Amount */}
              <div className="flex justify-between items-center py-3 lg:py-4">
                <span className="text-sm lg:text-base text-[#8E8E93]">
                  Amount
                </span>
                <span className="font-semibold text-gray-900 text-sm lg:text-base">
                  ₦300,500
                </span>
              </div>

              {/* Charges */}
              <div className="flex justify-between items-center py-3 lg:py-4">
                <span className="text-sm lg:text-base text-[#8E8E93]">
                  Charges
                </span>
                <span className="font-semibold text-gray-900 text-sm lg:text-base">
                  ₦5,500
                </span>
              </div>

              <div className="flex justify-between items-center py-3 lg:py-4">
                <span className="text-sm lg:text-base text-[#8E8E93]">
                  Total
                </span>
                <span className="font-semibold text-gray-900 text-sm lg:text-base">
                  ₦305,000
                </span>
              </div>
            </div>
          </div>

          {getDetailsButtons()}
        </div>

        {openModal && (
          <Monitor isOpen={openModal} onClose={() => setOpenModal(false)} />
        )}
      </div>
    </MainLayout>
  );
};

export default BookingDetailsPage;
