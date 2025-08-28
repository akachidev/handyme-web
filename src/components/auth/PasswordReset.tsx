import React, { useState } from "react";
import { motion } from "framer-motion";
import { RouterConstantUtil } from "@/lib/RouterConstantUtils";
import { Link, useNavigate } from "react-router";
import { AnimatedButton } from "../ui/AnimatedButton";
import { authAPI } from "@/lib/api/auth";
import OTPVerification from "./OTPVerification";
import SuccessModal from "../modals/SucessModal";
import { modalConfigs } from "@/constants/modalConfig";
import { toast } from "react-toastify";

interface FormData {
  email: string;
}

interface FormErrors {
  email?: string;
  otp?: string;
}

enum ResetStep {
  EMAIL_INPUT = "email_input",
  OTP_VERIFICATION = "otp_verification",
}

// Main Reset Password Component
const ResetPassword: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ResetStep>(
    ResetStep.EMAIL_INPUT
  );
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await authAPI.forgotPassword({ email: formData.email });

      setCurrentStep(ResetStep.OTP_VERIFICATION);
      toast.success(`OTP sent to: ${formData.email}`);
    } catch (error) {
      console.error("Forgot password error:", error);
      const errMsg =
        (error as any)?.response?.data?.message ||
        "Failed to send OTP. Please try again.";
      toast.error(errMsg);
      setErrors({
        email:
          (error as any)?.response?.data?.message ||
          "Failed to send OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSuccessModalComplete = () => {
    setShowSuccessModal(false);
    navigate(RouterConstantUtil.page.auth.login);
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

  const renderEmailInput = () => (
    <div className="flex py-10 w-full lg:max-w-[80%] mx-auto gap-20">
      <motion.div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{
            backgroundImage: `url('/images/AUTHIMG1.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-[47%]" />
          <motion.div
            className="absolute bottom-[6rem] right-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/[31%] bg-opacity-90 backdrop-blur-sm rounded-lg px-6 py-2 max-w-sm">
              <h3 className="text-[20px] font-semibold text-[#1E2B3A]">
                Everyday help, anytime
              </h3>
              <p className="text-[#2C2C2E] text-[16px] font-medium">
                Find trusted local experts for all your daily tasks, from
                cleaning back to running errands.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2 h-[70vh] flex justify-center px-4 py-8 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-lg space-y-6">
          <motion.div variants={itemVariants} className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-[#1E2B3A]">
              Forgot Password?
            </h1>
            <p className="text-[#1E2B3A] text-[16px]">
              We'll help you reset your password in a few quick
              <br /> steps.
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-4 w-full"
          >
            <div className="space-y-1">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3.5 bg-[#F0F0F073] border border-solid border-grayish-100 rounded-lg text-gray-500 placeholder-grayish-100 outline-none transition-all duration-200 ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div className="pt-7">
              <AnimatedButton
                disabled={isLoading}
                className="w-full rounded-lg"
                type="submit"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending OTP...</span>
                  </div>
                ) : (
                  "Send OTP"
                )}
              </AnimatedButton>
            </div>
          </motion.form>

          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-gray-600 mt-16 pt-8 font-medium"
          >
            Back to
            <Link
              to={RouterConstantUtil.page.auth.login}
              className="text-teal-500 hover:text-teal-600 font-bold transition-colors pl-1"
            >
              Login
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case ResetStep.EMAIL_INPUT:
        return renderEmailInput();

      case ResetStep.OTP_VERIFICATION:
        return (
          <OTPVerification
            email={formData.email}
            setShowSuccessModal={setShowSuccessModal}
          />
        );

      default:
        return renderEmailInput();
    }
  };

  return (
    <>
      {renderCurrentStep()}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalComplete}
        title={modalConfigs.signup.title}
        description={modalConfigs.signup.description}
        ctaText={modalConfigs.signup.ctaText}
        onCtaClick={handleSuccessModalComplete}
      />
    </>
  );
};

export default ResetPassword;
