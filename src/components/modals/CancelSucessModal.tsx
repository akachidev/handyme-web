import React from "react";
import { MapPin, Star } from "lucide-react";
import { formatCurrency, formatDate, formatTime } from "@/lib/utils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BookingDetails {
  id: string;
  service: string;
  artisan: {
    name: string;
    avatar?: string;
    location: string;
    rating: number;
  };
  date: string;
  time: string;
  amount: number;
  charges: number;
  total: number;
  duration?: string;
}

interface CancelSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingDetails;
}

const CancelSuccessModal: React.FC<CancelSuccessModalProps> = ({
  isOpen,
  onClose,
  booking,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-0 bg-white rounded-2xl border-none shadow-2xl">
        {/* Success Animation */}
        <div className="flex flex-col items-center pt-8 pb-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-red-500 opacity-10 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-red-500 opacity-20 animate-ping"></div>

            {/* Small floating dots */}
            <div className="absolute -top-2 -left-2 w-3 h-3 bg-red-500 rounded-full animate-bounce delay-100"></div>
            <div className="absolute -top-3 right-2 w-2 h-2 bg-red-500 rounded-full animate-bounce delay-300"></div>

            {/* Main icon container */}
            <div className="relative w-20 h-20 rounded-full flex items-center justify-center">
              <img
                src="/icons/ICON8.png"
                className="h-full w-full object-contain"
                alt="Cancel icon"
              />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-[#EA4335] mb-2">
            Cancelled Successfully
          </h2>
        </div>

        <div className="pb-6">
          <div className="mx-5 px-4 p-2 rounded-md mb-4 border border-dashed border-[#6CA0FE4D]/[30%]">
            <div className="rounded-lg">
              <div className="flex items-start gap-3 lg:gap-4">
                <img
                  src={booking.artisan.avatar}
                  alt={booking.service}
                  className="w-14 h-14 lg:w-20 lg:h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base lg:text-lg font-semibold text-[#00C2A8]">
                    {booking.service}
                  </h3>
                  <div className="flex items-center gap-2 lg:gap-3 mb-2">
                    <span className="font-medium text-gray-900 text-sm lg:text-base truncate">
                      {booking.artisan.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3 lg:w-4 lg:h-4 text-red-500 flex-shrink-0" />
                    <span className="text-xs lg:text-sm text-[#8E8E93] truncate">
                      {booking.artisan.location}
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
                      {booking.artisan.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 my-6">
              <div className="flex justify-between items-center">
                <span className="text-[#8E8E93] text-[16px]">Time/Date</span>
                <div className="flex gap-1 text-right font-semibold">
                  <div className="text-[#0E1B42] text-[15px]">
                    {formatDate(booking.date)}
                  </div>
                  <div className="text-sm text-[#407CE8]">
                    {formatTime(booking.time)}
                  </div>
                </div>
              </div>

              {/* Dotted Line */}
              <div className="border-b border-dashed border-[#6CA0FE57]/[34%] my-2 lg:my-4"></div>

              {/* Amount */}
              <div className="flex justify-between items-center">
                <span className="text-[#8E8E93] text-[16px]">Amount</span>
                <span className="font-semibold text-[#1E2B3A]">
                  {formatCurrency(booking.amount)}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-[#8E8E93] text-[16px]">Charges</span>
                <span className="font-semibold text-[#1E2B3A]">
                  {formatCurrency(booking.charges)}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-[#8E8E93] text-[16px]">Total</span>
                <span className="font-bold text-[#1E2B3A] text-lg">
                  {formatCurrency(booking.total)}
                </span>
              </div>
            </div>
          </div>

          <div className="px-5">
            <button
              onClick={onClose}
              className="w-full py-4 bg-transparent border-2 border-[#585858] text-[#1E2B3A] rounded-xl font-semibold hover:bg-[#F7F9FA] transition-colors duration-200"
            >
              Home
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CancelSuccessModal;
