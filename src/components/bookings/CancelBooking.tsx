import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

interface CancelBookingProps {
  onBack: () => void;
  onCancel: (reason: string) => void;
}

const CancelBookingPage: React.FC<CancelBookingProps> = ({
  onBack,
  onCancel,
}) => {
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customReason, setCustomReason] = useState<string>("");

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
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#8E8E93] hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Back</span>
            </button>
          </div>
        </div>

        {/* Reason Options */}
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

        {/* Custom Reason Textarea */}
        {selectedReason === "Other" && (
          <div className="mb-6">
            <textarea
              placeholder="State Reason"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg resize-none h-32 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Cancel Button */}
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
    </MainLayout>
  );
};

export default CancelBookingPage;
