import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import CancelSuccessModal from "../modals/CancelSucessModal";

interface CancelBookingProps {
  onBack: () => void;
  onCancel: (reason: string) => void;
}

const CancelBooking: React.FC<CancelBookingProps> = ({ onBack, onCancel }) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const reasons = [
    "Changed my mind",
    "Service provider isn't responding",
    "Wrong time/location",
    "Other",
  ];

  const handleCancel = () => {
    const finalReason =
      selectedReason === "Other" ? customReason : selectedReason;
    onCancel(finalReason);
    setIsModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto pt-8 pb-4 mb-6 bg-white rounded-md">
        <div className="flex items-center justify-between p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#8E8E93] hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <h1 className="text-lg font-semibold text-[#1C1C1E] absolute left-1/2 transform -translate-x-1/2">
            Cancel Booking
          </h1>
        </div>
        <div className="p-6">
          <div className="space-y-4 mb-6">
            {reasons.map((reason) => (
              <label
                key={reason}
                className="flex items-center justify-between cursor-pointer p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-700">{reason}</span>
                <div className="relative">
                  <input
                    type="radio"
                    name="cancelReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedReason === reason
                        ? "border-teal-500 bg-teal-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedReason === reason && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>

          {selectedReason === "Other" && (
            <div className="mb-6">
              <textarea
                placeholder="State Reason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                className="w-full bg-white p-4 border border-gray-300 rounded-lg resize-none h-32 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-400"
              />
            </div>
          )}

          <button
            onClick={handleCancel}
            disabled={
              !selectedReason ||
              (selectedReason === "Other" && !customReason.trim())
            }
            className="w-full bg-red-500 text-white py-3 rounded-lg font-medium hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Cancel Booking
          </button>
        </div>
      </div>

      {isModalOpen && (
        <CancelSuccessModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          booking={sampleBooking}
        />
      )}
    </MainLayout>
  );
};

export default CancelBooking;
