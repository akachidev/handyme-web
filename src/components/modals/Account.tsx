import React from "react";
import { User, Settings, LogOut, X } from "lucide-react";
import { NavLink } from "react-router";
import { RouterConstantUtil } from "@/lib/RouterConstantUtils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md rounded-2xl bg-white shadow-2xl border-none p-0 md:m-6 md:mt-6">
        <div className="flex items-center justify-between p-4">
          <h2
            className="text-[18px] font-semibold text-[#00C2A8]"
            style={{ fontFamily: "Craftwork, sans-serif" }}
          >
            My Account
          </h2>
          <button
            onClick={onClose}
            className="w-5 h-5 bg-[#1E2B3A] text-white rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors"
          >
            <X size={10} />
          </button>
        </div>

        <div className="p-2 space-y-2">
          <NavLink
            to={RouterConstantUtil.page.account}
            onClick={onClose}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-[#00C2A81A]/[10%] transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-center">
              <User size={20} className="text-[#00C2A8]" fill="#00C2A8" />
            </div>
            <span
              className="text-[15px] font-bold text-[#1E2B3A]"
              style={{ fontFamily: "Craftwork, sans-serif" }}
            >
              My Account
            </span>
          </NavLink>

          {/* Settings */}
          <NavLink
            to={RouterConstantUtil.page.settings}
            onClick={onClose}
            className="flex items-center space-x-4 p-4 rounded-lg hover:bg-[#00C2A81A]/[10%] transition-colors cursor-pointer group"
          >
            <div className="flex items-center justify-center">
              <Settings size={20} className="text-[#00C2A8]" stroke="#00C2A8" />
            </div>
            <span
              className="text-[15px] font-bold text-[#1E2B3A]"
              style={{ fontFamily: "Craftwork, sans-serif" }}
            >
              Settings
            </span>
          </NavLink>

          {/* Logout */}
          <div className="flex items-center space-x-4 p-4 rounded-lg hover:bg-[#FFF3F3] transition-colors cursor-pointer group">
            <div className="flex items-center justify-center">
              <LogOut size={20} className="text-[#00C2A8]" fill="#00C2A8" />
            </div>
            <span
              className="text-[15px] font-bold text-[#1E2B3A]"
              style={{ fontFamily: "Craftwork, sans-serif" }}
            >
              Logout
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AccountModal;
