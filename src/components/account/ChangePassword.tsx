import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const togglePasswordVisibility = (
    field: "newPassword" | "confirmPassword"
  ) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = () => {
    console.log("Password change submitted:", formData);
  };

  return (
    <div className="p-8 bg-white min-h-[80vh] rounded-xl">
      <div className="w-full">
        <h1 className="text-xl font-semibold text-[#1E2B3A] mb-2">
          Reset your password
        </h1>

        <div className="w-full border border-dashed mb-8"></div>

        <div className="space-y-6">
          <div className="relative">
            <input
              type={showPassword.newPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange("newPassword", e.target.value)}
              className="w-full px-4 py-4 pr-12 bg-[#ECECEC] border border-[#444444] rounded-xl focus:ring-1 focus:ring-[#00C2A8] focus:border-transparent outline-none text-[#363636] placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword.newPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className="w-full px-4 py-4 pr-12 bg-[#ECECEC] border border-[#444444] rounded-xl focus:ring-1 focus:ring-[#00C2A8] focus:border-transparent outline-none text-[#363636] placeholder-gray-500"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword.confirmPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#00C2A8] text-white py-4 px-6 rounded-xl font-medium text-lg hover:bg-[#00A896] transition-colors focus:ring-4 focus:ring-[#00C2A8] focus:ring-opacity-30 outline-none"
          >
            Verify Mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
