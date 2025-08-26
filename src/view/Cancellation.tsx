import MainLayout from "@/components/layouts/MainLayout";

const CancellationPolicy = () => {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8  ">
        <div className="w-full max-w-6xl mx-auto bg-white rounded p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#363636] mb-6">
              Cancellation Policy
            </h1>
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#363636] max-w-3xl mx-auto">
              We understand that plans can change. This policy outlines how
              cancellations work for both customers and service providers on
              HandyMe.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 lg:space-y-10">
            {/* For Customers */}
            <section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#363636] mb-6">
                For Customers:
              </h2>
              <div className="space-y-4">
                <p className="text-sm sm:text-base lg:text-lg text-[#363636]">
                  <span className="font-semibold">Free Cancellation:</span> You
                  can cancel a booking up to 1 hour before the scheduled time
                  without any charges.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-[#363636]">
                  <span className="font-semibold">
                    Late Cancellations (Less than 1 hour notice):
                  </span>{" "}
                  A ₦1500 cancellation fee may apply to compensate the service
                  provider for lost time.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-[#363636]">
                  <span className="font-semibold">No-Show:</span> If you miss
                  your appointment without canceling, full service charge may
                  apply.
                </p>
              </div>
            </section>

            {/* For Service Providers */}
            <section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#363636] mb-6">
                For Service Providers:
              </h2>
              <div className="space-y-4">
                <p className="text-sm sm:text-base lg:text-lg text-[#363636]">
                  Service providers must give at least 1 hour notice if they are
                  unable to honor a booking.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-[#363636]">
                  Frequent or last-minute cancellations may lead to account
                  suspension or review.
                </p>
                <p className="text-sm sm:text-base lg:text-lg text-[#363636]">
                  If a provider cancels, the customer will be refunded in full
                  or matched with an available alternative.
                </p>
              </div>
            </section>

            {/* How to Cancel */}
            <section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#363636] mb-6">
                How to Cancel:
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#363636] leading-relaxed">
                You can cancel any booking through the HandyMe app under the "My
                Bookings" section, or by contacting customer support if you're
                unable to access the app.
              </p>
            </section>

            {/* Our Commitment */}
            <section>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#363636] mb-6">
                Our Commitment
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#363636] leading-relaxed">
                We aim to keep things fair for both sides. If you believe a
                cancellation fee was wrongly applied, please reach out — we're
                happy to review the case.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CancellationPolicy;
