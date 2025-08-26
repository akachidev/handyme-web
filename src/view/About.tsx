import MainLayout from "@/components/layouts/MainLayout";

const AboutHandyMe = () => {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 ">
        <div className="w-full max-w-6xl mx-auto bg-white rounded p-4 sm:p-6 lg:p-8  ">
          {/* Header */}
          <div className="mb-8 lg:mb-12">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#363636] mb-4 text-center">
              About HandyMe
            </h1>
            <div className="text-sm sm:text-base lg:text-lg text-[#363636] font-medium mb-6">
              Need a hand? Get one in minutes.
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 lg:space-y-8">
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#363636] font-normal">
              HandyMe is a location-based service marketplace that connects
              everyday people with skilled, reliable service providers — from
              plumbers to tutors, cleaners to tailors.
            </p>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#363636] font-normal">
              Whether it's a leaking tap, a last-minute delivery, or help with
              schoolwork, HandyMe makes it easy to find the right help, right
              when you need it. We're building the "Uber for everyday help" — a
              fast, safe, and fair way to get things done, while creating income
              opportunities for skilled individuals across your city.
            </p>

            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#363636] font-normal">
              With real-time bookings, verified professionals, and secure
              payments, HandyMe takes the stress out of getting help — so you
              can focus on what matters.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutHandyMe;
