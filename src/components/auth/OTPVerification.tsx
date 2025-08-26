import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { RouterConstantUtil } from "@/lib/RouterConstantUtils";
import { CircleAlert } from "lucide-react";
import { authAPI } from "@/lib/api/auth";
import type { VerifyOtpRequest } from "types/auth";
import { toast } from "react-toastify";

interface OTPVerificationProps {
  email: string;
  setShowSuccessModal: (vale: boolean) => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  setShowSuccessModal,
}) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState<number>(59);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (error) setError("");

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const payload: VerifyOtpRequest = {
        type: "EMAIL_VERIFICATION",
        code: otpString,
        identifier: email,
      };
      await authAPI.verifyOtp(payload);

      toast.success("OTP verified successfully");
      setShowSuccessModal(true);
      //   navigate(RouterConstantUtil.page.home);

      //   console.log("OTP verified successfully:", data);
    } catch (err) {
      const errorMessage =
        (error as any)?.response?.data?.message ??
        "Verification failed. Please try again.";
      setError(errorMessage);

      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setIsLoading(true);

      const payload = {
        type: "EMAIL_VERIFICATION" as const,
        identifier: email,
      };

      await authAPI.sendVerificationCode(payload);
      toast.success("OTP sent succesfully");

      setCountdown(59);
      setOtp(["", "", "", "", "", ""]);
      setError("");
      inputRefs.current[0]?.focus();
    } catch (err) {
      toast.success("Failed to resend OTP. Please try again.");
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex py-10 w-full lg:max-w-[85%] mx-auto gap-16">
      {/* Left Side - Map */}
      <motion.div
        className="hidden lg:block lg:w-1/2 relative overflow-hidden rounded-xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="h-[60vh] w-full rounded-xl overflow-hidden">
          <img
            src="/images/AUTHMAP.png"
            alt="Map showing service area"
            className="h-full w-full object-contain"
          />
        </div>

        {/* <motion.div
          className=""
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                World Bank, Owerri
              </h3>
              <p className="text-sm text-gray-600">Imo State</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-blue-500">15 Km</p>
            </div>
          </div>
        </motion.div> */}

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="px-6 py-4 text-center">
            <h3 className="text-[24px] font-semibold text-[#1E2B3A] mb-3">
              Fast, reliable service
            </h3>
            <p className="text-[#2C2C2E] text-[16px] font-medium leading-relaxed">
              Get matched instantly with skilled handy people <br /> near you —
              track everything easily.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Side - OTP Form */}
      <motion.div
        className="w-full lg:w-1/2 flex  justify-center p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-3">
            <h1 className="text-3xl font-semibold text-gray-900">
              OTP Verification
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Please check the email you submitted for the 6 digits code sent to
              you for your account verification.
            </p>
            {email && (
              <p className="text-sm text-gray-500">
                Code sent to: <span className="font-medium">{email}</span>
              </p>
            )}
          </motion.div>

          {/* OTP Input */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex justify-center space-x-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 border-2 rounded-lg text-center text-lg font-semibold transition-all duration-200 ${
                    digit
                      ? "border-primary bg-[#F7F9FA] text-primary"
                      : "border-gray-300 bg-white"
                  } focus:outline-none focus:border-primary focus:ring-2 focus:ring-teal-100 ${
                    error ? "border-red-500" : ""
                  }`}
                />
              ))}
            </div>

            {/* Error Message */}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center text-center justify-center gap-2 font-medium text-red-500 text-sm"
              >
                <CircleAlert className="w-4 h-4 text-red-500" stroke="red" />
                {error}
              </motion.p>
            )}

            {/* Resend Code */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Resend code in{" "}
                <span className="font-semibold text-primary">
                  00:{countdown.toString().padStart(2, "0")}
                </span>
              </p>
              {countdown === 0 && (
                <button
                  onClick={handleResend}
                  disabled={isLoading}
                  className="mt-2 text-primary hover:text-primary font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Sending..." : "Resend Code"}
                </button>
              )}
            </div>
          </motion.div>

          {/* Verify Button */}
          <motion.div variants={itemVariants}>
            <button
              onClick={handleVerify}
              disabled={isLoading || otp.some((digit) => !digit)}
              className="w-full bg-brandprimary hover:bg-brandprimary disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify"
              )}
            </button>
          </motion.div>

          {/* Sign In Link */}
          <motion.p
            variants={itemVariants}
            className="text-center font-bold text-[14px] text-gray-600 mt-16 pt-8"
          >
            <Link
              to={RouterConstantUtil.page.auth.login}
              className="text-primary hover:text-teal-600 transition-colors"
            >
              Signin
            </Link>{" "}
            Instead
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
