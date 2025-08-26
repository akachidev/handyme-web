import React, { useEffect } from "react";
import { X, MapPin } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Monitor: React.FC<Props> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Header */}
        <div className="relative">
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 className="text-xl font-semibold text-[#1E2B3A]">Arriving</h2>
            <button
              onClick={onClose}
              className="p-2 -m-2 text-[#363636] hover:bg-[#F3F3F3] rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Map Container */}
          <div className="relative h-96 mx-6 mb-4 bg-gray-200 rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63245.19174!2d7.0244!3d5.4840!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10425d0b6e25b1c7%3A0x7d57a5c0b8f5c5!2sWorld%20Bank%2C%20Owerri!5e0!3m2!1sen!2sng!4v1635789123456!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
            />
          </div>

          {/* Current Location Section */}
          <div className="px-6 pb-6">
            <div className="text-center mb-4">
              <p className="text-sm text-[#444444] opacity-75 font-medium">
                Current Location
              </p>
            </div>

            <div className="flex items-center justify-between bg-[#F7F9FA] rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#1E2B3A] text-base">
                    World Bank, Owerri
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#00C2A8] font-semibold text-lg">15 Km</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
