import React, { useState } from "react";

const Notifications: React.FC = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);

  return (
    <div className="p-8 bg-white min-h-[90vh] rounded-xl">
      <h2 className="text-xl font-semibold text-[#1E2B3A] mb-6">
        Notifications
      </h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-[#1E2B3A]">Push Notifications</h3>
            <p className="text-sm text-[#363636]">
              Get notified about booking updates
            </p>
          </div>
          <button
            onClick={() => setPushEnabled(!pushEnabled)}
            className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
              pushEnabled ? "bg-[#00C2A8]" : "bg-gray-300"
            }`}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                pushEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-[#1E2B3A]">Email Notifications</h3>
            <p className="text-sm text-[#363636]">
              Receive booking confirmations via email
            </p>
          </div>
          <button
            onClick={() => setEmailEnabled(!emailEnabled)}
            className={`w-12 h-6 flex items-center rounded-full transition-colors duration-300 ${
              emailEnabled ? "bg-[#00C2A8]" : "bg-gray-300"
            }`}
          >
            <span
              className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-300 ${
                emailEnabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
