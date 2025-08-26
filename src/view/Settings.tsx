import React, { useState } from "react";
import { Languages, OctagonAlert } from "lucide-react";
import EditProfile from "@/components/account/EditProfile";
import MainLayout from "@/components/layouts/MainLayout";
import Permissions from "@/components/account/Permissions";
import Language from "@/components/account/Language";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("editProfile");

  const menuItems = [
    {
      id: "permissions",
      icon: OctagonAlert,
      label: "Permissions ",
      component: Permissions,
    },
    {
      id: "language",
      icon: Languages,
      label: "Language",
      component: Language,
    },
  ];

  const ActiveComponent =
    [...menuItems].find((item) => item.id === activeTab)?.component ||
    EditProfile;

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#F7F9FA] flex">
        {/* Sidebar - Fixed height, no scroll */}
        <div className="w-16 sm:w-16 md:w-20 lg:w-80 bg-white shadow-sm rounded-xl h-[90vh] absolute left-0 lg:left-6 md:left-4 sm:left-2 flex flex-col">
          <div className="flex-1 px-1 py-2  ">
            <nav className="space-y-5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center p-2 lg:p-4 md:p-3 sm:p-2  text-left transition-colors hover:bg-gray-50 relative ${
                      activeTab === item.id
                        ? "bg-white border-l-4 border-[#00C2A8]"
                        : ""
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center justify-center lg:justify-start w-full">
                      <Icon
                        className={`w-5 h-5 ${
                          activeTab === item.id
                            ? "text-[#00C2A8]"
                            : "text-[#363636]"
                        }`}
                      />
                      <span
                        className={`font-bold ml-3 hidden lg:inline ${
                          activeTab === item.id
                            ? "text-[#00C2A8]"
                            : "text-[#363636]"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 ml-16 sm:ml-16 md:ml-20 lg:ml-96 mr-0 lg:mr-6 md:mr-4 sm:mr-2">
          <div className="h-screen overflow-y-auto">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
