import React, { useState } from "react";
import { User, CreditCard, Bell, Trash2, Lock } from "lucide-react";
import DeleteAccount from "@/components/account/DeleteAccount";
import EditProfile from "@/components/account/EditProfile";
import PaymentMethods from "@/components/account/PaymentMethods";
import Notification from "@/components/account/Notifications";
import ChangePassword from "@/components/account/ChangePassword";
import MainLayout from "@/components/layouts/MainLayout";

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState("editProfile");

  const menuItems = [
    {
      id: "editProfile",
      icon: User,
      label: "Edit Profile",
      component: EditProfile,
    },
    {
      id: "paymentMethods",
      icon: CreditCard,
      label: "Payment Methods",
      component: PaymentMethods,
    },
    {
      id: "changePassword",
      icon: Lock,
      label: "Change Password",
      component: ChangePassword,
    },
    {
      id: "notifications",
      icon: Bell,
      label: "Notifications",
      component: Notification,
      hasToggle: true,
    },
  ];

  const deleteAccountItem = {
    id: "deleteAccount",
    icon: Trash2,
    label: "Delete Account",
    component: DeleteAccount,
  };

  const ActiveComponent =
    [...menuItems, deleteAccountItem].find((item) => item.id === activeTab)
      ?.component || EditProfile;

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
                    {item.hasToggle && (
                      <div className="hidden lg:flex items-center ml-auto">
                        <div className="w-10 h-5 bg-[#00C2A8] rounded-full relative">
                          <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Delete Account Button - Fixed at bottom */}
          <div className="p-2">
            <button
              onClick={() => setActiveTab("deleteAccount")}
              className={`w-full flex items-center p-2 lg:p-4 md:p-3 sm:p-2 rounded-lg text-left transition-colors bg-[#EA4335] text-white relative ${
                activeTab === "deleteAccount"
                  ? "bg-red-50 border-l-4 border-red-500"
                  : ""
              }`}
              title="Delete Account"
            >
              <div className="flex items-center justify-center  w-full">
                <Trash2 className="w-5 h-5 text-red-500" />
                <span className="font-medium text-white ml-3 hidden lg:inline">
                  Delete Account
                </span>
              </div>
            </button>
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

export default Account;
