import React, { useState } from "react";
import RequestBooking from "@/components/bookings/ReqBooking";
import CompleteBooking from "@/components/bookings/CompleteBooking";
import ConfirmBooking from "@/components/bookings/ConfirmBooing";
import MainLayout from "@/components/layouts/MainLayout";

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    category: "",
    service: "",
    location: "Asaba, Anambra",
    description: "",
    duration: 8,
    price: 55000,
    dateTime: "",
  });

  const steps = [
    { id: 1, label: "Booking Details", component: "request" },
    { id: 2, label: "Complete Booking", component: "complete" },
    { id: 3, label: "Confirm Booking", component: "confirm" },
  ];

  const handleContinue = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleConfirm = () => {
    console.log("Booking confirmed:", formData);
    // Handle final booking submission
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Request a Booking";
      case 2:
        return "Complete Booking";
      case 3:
        return "Confirm Booking";
      default:
        return "Request a Booking";
    }
  };

  return (
    <MainLayout>
      <div className="w-full max-w-6xl mx-auto p-4 lg:p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#363636] mb-8">
            {getStepTitle()}
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      step.id <= currentStep ? "bg-[#00C2A8]" : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`ml-2 text-sm font-medium ${
                      step.id <= currentStep
                        ? "text-[#00C2A8]"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-4 h-px bg-gray-300"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className=" p-8 bg-white rounded-xl ">
          {currentStep === 1 && (
            <RequestBooking
              onContinue={handleContinue}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentStep === 2 && (
            <CompleteBooking
              onContinue={handleContinue}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentStep === 3 && (
            <ConfirmBooking onConfirm={handleConfirm} formData={formData} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingPage;
