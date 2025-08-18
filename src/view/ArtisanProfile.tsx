import { useState } from "react";
import { Star, ChevronLeft, Camera, Grid3X3 } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { reviewsData } from "@/assets/data";

// Tab Components
const AboutTab = () => (
  <div className="px-2 py-4 ">
    <div className="flex justify-between items-start gap-3 mb-4 bg-white p-3 rounded-lg">
      <div className="flex gap-3">
        <img src="/icons/ICON6.png" className="h-10 w-10" alt="handyme" />
        <h3 className="font-medium text-[#1E2B3A]  mb-1">
          Temeqtala, Awka Anambra State
        </h3>
      </div>
      <p className="text-[#6CA0FE] font-medium">4km</p>
    </div>

    <div className="text-[#2C2C2E] text-sm font-medium leading-relaxed bg-white p-3 min-h-[300px]">
      <p>
        Hi, I'm David — a certified auto technician with over 8 years of
        experience in car diagnostics, repairs, and maintenance. I've helped
        over 200 customers keep their vehicles running smoothly, whether it's a
        quick battery change or full engine work. Reliable, on time, and always
        ready to assist!
      </p>
    </div>
  </div>
);

const JobGalleryTab = () => (
  <div className=" py-4">
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center"
        >
          <Camera className="w-8 h-8 text-gray-400" />
        </div>
      ))}
    </div>
    <div className="text-center text-gray-500 text-sm mt-6">
      <Grid3X3 className="w-12 h-12 mx-auto mb-2 text-gray-300" />
      <p>No gallery items yet</p>
      <p className="text-xs">Completed jobs will appear here</p>
    </div>
  </div>
);

const ReviewsTab = () => (
  <div className=" py-4">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {reviewsData.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  </div>
);

const Artisan = () => {
  const [activeTab, setActiveTab] = useState<
    "About" | "Job Gallery" | "Reviews"
  >("About");

  const tabs = [
    { name: "About" as const, component: AboutTab },
    { name: "Job Gallery" as const, component: JobGalleryTab },
    { name: "Reviews" as const, component: ReviewsTab },
  ];

  const renderTabContent = () => {
    const activeTabData = tabs.find((tab) => tab.name === activeTab);
    if (activeTabData) {
      const Component = activeTabData.component;
      return <Component />;
    }
    return <AboutTab />;
  };

  return (
    <MainLayout className="min-h-screen ">
      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
        <img
          src="/images/artisan.png"
          alt="Service provider background"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        <button className="absolute top-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>

      <div className="w-full">
        <div className="bg-white">
          <div className="relative -mt-20 w-full max-w-5xl mx-auto ">
            <div className=" overflow-hidden">
              <div className="px-6 pt-6 pb-4">
                <div className="hidden md:flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-[200px] h-[200px] rounded-full border-4 border-[#00C2A8] shadow-sm overflow-hidden bg-black">
                        <img
                          src="/images/artisan.png"
                          alt="Nwakwo Kennedy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-xl font-bold text-[#00C2A8] ">
                          Nwakwo Kennedy
                        </h1>
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <p className="text-[#2C2C2E] text-sm">Mechanic</p>
                    </div>
                  </div>

                  {/* Right: Rating + Date */}
                  <div className="text-right mt-16">
                    <div className="flex items-center gap-1 mb-1 justify-end">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-[#6CA0FE]">
                        4.2
                      </span>
                    </div>
                    <p className="text-xs text-[#989FB0] font-bold">
                      Joined Feb 2024
                    </p>
                  </div>
                </div>

                {/* Profile Header - Mobile (Centered) */}
                <div className="md:hidden text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full border-4 border-[#00C2A8] shadow-sm overflow-hidden black">
                        <img
                          src="/images/artisan.png"
                          alt="Nwakwo Kennedy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h1 className="text-xl font-bold text-[#00C2A8]">
                      Nwakwo Kennedy
                    </h1>
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3">Mechanic</p>

                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-900">
                      4.2
                    </span>
                  </div>

                  <p className="text-xs text-gray-500">Joined Feb 2024</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 mt-10">
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <img
                        src="/icons/ICON3.png"
                        className="h-12 w-12"
                        alt="handyme"
                      />
                    </div>
                    <span className="text-[16px] font-bold text-[#2C2C2E] mr-1">
                      45
                    </span>
                    <span className="text-xs text-[#989FB0] font-medium">
                      Reviews
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <img
                        src="/icons/ICON1.png"
                        className="h-12 w-12"
                        alt="handyme"
                      />
                    </div>
                    <span className="text-[16px] font-bold text-[#2C2C2E] mr-1">
                      56
                    </span>
                    <span className="text-xs text-[#989FB0] font-medium">
                      Jobs Done
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <img
                        src="/icons/ICON4.png"
                        className="h-12 w-12"
                        alt="handyme"
                      />
                    </div>
                    <span className="text-[16px] font-bold text-[#2C2C2E] mr-1">
                      ₦2,000
                    </span>
                    <span className="text-xs text-[#989FB0] font-medium">
                      Starting Bid
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-6"></div>
          </div>
        </div>
        <div className="bg-[#F7F9FA] pt-6">
          <div className="w-full max-w-7xl mx-auto ">
            <div className="flex gap-3 space-x-10 mb-6 bg-white w-full max-w-4xl mx-auto p-3 rounded-lg">
              <button className="flex-1 bg-[#00C2A8] text-white py-3 rounded-lg font-medium hover:bg-teal-600 transition-colors">
                Request a Booking
              </button>
              <button className="w-12 h-12 flex items-center justify-center  transition-colors hover:scale-95">
                <img src="/icons/ICON5.png" className="" alt="handyme" />
              </button>
            </div>

            <div className="bg-white rounded-lg mb-7">
              <nav className="flex p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`flex-1 py-4 px-4 text-sm font-medium  rounded-lg transition-colors ${
                      activeTab === tab.name
                        ? " text-[#00C2A8] bg-[#00C2A826]/[15%]"
                        : "border-transparent text-gray-500 "
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="my-6">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Artisan;
