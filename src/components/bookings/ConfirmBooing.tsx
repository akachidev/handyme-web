import { Star, MapPin } from "lucide-react";
import BookingSucessModal from "../modals/BookingSucess";
import { useState } from "react";

interface Props {
  onConfirm: any;
  formData: any;
}

const ConfirmBooking = ({ onConfirm, formData }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const hanldeBooking = () => {
    onConfirm();
    setIsOpen(true);
  };

  const sampleBooking = {
    id: "1",
    service: "Repairs & Fixes",
    artisan: {
      avatar: "/images/artisan.png",
      name: "Nwankwo Kennedy",
      location: "Awka, Anambra State, Nigeria",
      rating: 4.1,
    },
    date: "2025-04-28",
    time: "12:35 PM",
    amount: 300500,
    charges: 3500,
    total: 304000,
    duration: "5hrs",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4 p-2 bg-white rounded-lg border border-[#6CA0FE4D]/[30%] shadow-sm">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
            alt="Service Provider"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-[#00C2A8] font-medium text-lg mb-1">
                {formData.category || "Repairs & Fixes"}
              </h3>
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src="/images/artisan.png"
                  className="h-6 w-6 rounded-full"
                />
                <span className="text-gray-700 font-medium">
                  Nwankwo Kennedy
                </span>
              </div>
              <div className="flex items-center text-[#8E8E93] text-sm">
                <MapPin className="w-4 h-4 mr-1 text-red-500" />
                <span>
                  {formData.location || "Awka, Anambra State, Nigeria"}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-[#1E2B3A] mb-1">
                ₦2,500/hr
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-gray-600 text-sm">4.1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border border-dashed border-[#6CA0FE57]" />

      {/* Details Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#1E2B3A]">Details</h2>

        <div className="space-y-4 border border-dashed border-[#6CA0FE57] p-2 rounded-md">
          <div className="flex justify-between items-center">
            <span className="text-[#8E8E93]">Category</span>
            <span className="text-[#444444] font-medium text-right">
              {formData.category || "Repairs & Fixes"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8E8E93]">Service</span>
            <span className="text-[#444444] font-medium text-right">
              {formData.service || "Mechanic"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8E8E93]">Location</span>
            <span className="text-[#444444] font-medium text-right">
              {formData.location || "Awka, Anambra"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8E8E93]">Starting Date</span>
            <span className="text-[#444444] font-medium text-right">
              {formData.dateTime
                ? new Date(formData.dateTime).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "13th May 2025"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8E8E93]">Time</span>
            <span className="text-[#444444] font-medium text-right">
              {formData.dateTime
                ? new Date(formData.dateTime).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                : "11:00 AM"}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8E8E93]">Estimated Duration</span>
            <span className="text-[#444444] font-medium text-right">
              {formData.duration || 5}hrs
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8E8E93]">Amount</span>
            <span className="text-[#444444] font-medium text-right">
              ₦{(formData.price || 300500).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-[#8E8E93]">Charges</span>
            <span className="text-[#444444] font-medium text-right">
              ₦3,500
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[#8E8E93]">Total</span>
            <span className="text-[#444444] font-bold text-lg">
              ₦{((parseInt(formData.price) || 300000) + 3500).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={hanldeBooking}
        className="w-full bg-[#00C2A8] text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-[#00A896] transition-colors"
      >
        Confirm
      </button>

      {isOpen && (
        <BookingSucessModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          booking={sampleBooking}
        />
      )}
    </div>
  );
};

export default ConfirmBooking;
