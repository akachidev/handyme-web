import React, { useState } from "react";

const Permissions: React.FC = () => {
  const [notEnabled, setNotEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);

  return (
    <div className="p-8 bg-white min-h-[90vh] rounded-xl">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <img src="/icons/ICON12.png" className="h-12 w-12" />
            <div>
              <h3 className="font-semibold text-[#121826]">Location</h3>
              <p className="text-sm text-[#4A4863] max-w-[250px] ">
                Allow location for accuracy and better service
              </p>
            </div>
          </div>
          <button
            onClick={() => setNotEnabled(!notEnabled)}
            className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
              notEnabled ? "bg-[#00C2A8]" : "bg-gray-300"
            }`}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                notEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <img src="/icons/ICON10.png" className="h-12 w-12" />
            <div>
              <h3 className="font-semibold text-[#121826]">Camera</h3>
              <p className="text-sm text-[#4A4863] max-w-[300px]">
                Allow camera for a quick photo, video and visual information
                capture
              </p>
            </div>
          </div>
          <button
            onClick={() => setCameraEnabled(!cameraEnabled)}
            className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
              cameraEnabled ? "bg-[#00C2A8]" : "bg-gray-300"
            }`}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                cameraEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <img src="/icons/ICON11.png" className="h-12 w-12" />
            <div>
              <h3 className="font-semibold text-[#121826]">Audio</h3>
              <p className="text-sm text-[#4A4863] max-w-[300px]">
                Allow microphone for seamless audio recording and message
              </p>
            </div>
          </div>
          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
              audioEnabled ? "bg-[#00C2A8]" : "bg-gray-300"
            }`}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                audioEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Permissions;
