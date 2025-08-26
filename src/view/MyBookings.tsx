import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import BookingCard from "@/components/cards/BookingCard";
import BookingDetailsPage from "@/components/bookings/BookingDetails";
import type { BookingCardProps } from "types/global";
import { bookings } from "@/assets/data";
import CancelBooking from "@/components/bookings/CancelBooking";

const MyBookings: React.FC = () => {
  const [selectedBooking, setSelectedBooking] =
    useState<BookingCardProps | null>(null);
  const [currentView, setCurrentView] = useState<"list" | "details" | "cancel">(
    "list"
  );
  // const [openCancelModdal, setOpenCancelModal] = useState(false);

  const handleCancel = (reason: string) => {
    // api call here
    console.log(reason);
    // setOpenCancelModal(true);
  };

  const bookingsWithHandlers = bookings.map((booking) => ({
    ...booking,
    onClick: () => {
      setSelectedBooking(booking);
      setCurrentView("details");
    },
  }));

  const [activeTab, setActiveTab] = useState<
    "Ongoing" | "Completed" | "Pending" | "Cancelled"
  >("Ongoing");

  const tabs = ["Ongoing", "Completed", "Pending", "Cancelled"] as const;

  const filteredBookings = bookingsWithHandlers.filter(
    (booking) => booking.status === activeTab
  );

  // Show details page if a booking is selected
  if (currentView === "details" && selectedBooking) {
    return (
      <BookingDetailsPage
        booking={selectedBooking}
        onBack={() => {
          setCurrentView("list");
          setSelectedBooking(null);
        }}
        setCurrentView={setCurrentView}
      />
    );
  }
  if (currentView === "cancel" && selectedBooking) {
    return (
      <CancelBooking
        onBack={() => {
          setCurrentView("list");
          setSelectedBooking(null);
        }}
        onCancel={() => handleCancel}
      />
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto pt-8 pb-4">
        <h1 className="text-3xl font-semibold text-[#171717] text-center mb-2">
          My Bookings
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-start gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-brandprimary text-white"
                  : "bg-transparent text-gray-600 hover:bg-brandprimary hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3  gap-2">
          {filteredBookings.map((booking) => (
            <BookingCard key={booking.id} {...booking} />
          ))}
        </div>

        {/* Empty State */}
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No {activeTab.toLowerCase()} bookings found.
            </p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyBookings;
