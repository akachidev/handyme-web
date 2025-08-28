import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import { RouterConstantUtil } from "@/lib/RouterConstantUtils";
import { Link } from "react-router";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { modalConfigs } from "@/constants/modalConfig";
import type { Country } from "types/global";
import { countries } from "@/constants/countries";
import SuccessModal from "@/components/modals/SucessModal";
import AuthLayout from "@/components/layouts/AuthLayout";
import OTPVerification from "@/components/auth/OTPVerification";
import { useAuthState } from "@/hooks/useAuthState";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

interface CompleteFormData {
  firstName: string;
  lastName: string;
  email: string;
  agreeToTerms: boolean;

  phoneNumber: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  agreeToTerms?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

export enum SignupStep {
  BASIC_SIGNUP = "basic_signup",
  PHONE_VERIFICATION = "phone_verification",
  OTP_VERIFICATION = "otp_verification",
}

interface BasicSignupProps {
  formData: CompleteFormData;
  updateFormData: (updates: Partial<CompleteFormData>) => void;
  onNext: () => void;
  errors: FormErrors;
  isLoading: boolean;
}

const BasicSignup: React.FC<BasicSignupProps> = ({
  formData,
  updateFormData,
  onNext,
  errors,
  isLoading,
}) => {
  const handleInputChange = (
    field: keyof CompleteFormData,
    value: string | boolean
  ) => {
    updateFormData({ [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
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
            backgroundImage: `url('/images/AUTHIMG2.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-[47%]" />
          <motion.div
            className="absolute bottom-[6rem] right-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/[45%] bg-opacity-90 backdrop-blur-sm rounded-lg px-6 py-2 max-w-sm">
              <h3 className="text-[20px] font-semibold text-[#1E2B3A]">
                Pay, relax, review.
              </h3>
              <p className="text-[#2C2C2E] text-[16px] font-medium">
                Book, chat, pay securely, and review — all in one smooth app.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2 flex justify-center px-4 py-8 overflow-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-lg space-y-6">
          <motion.div variants={itemVariants} className="text-center space-y-2">
            <h1 className="text-2xl font-semibold text-[#1E2B3A]">
              Let's set you up
            </h1>
            <p className="text-[#1E2B3A] text-sm">
              Start booking handy help near you
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-4 w-full"
          >
            {/* First Name */}
            <div className="space-y-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter FirstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className={`w-full px-4 py-3 bg-[#F0F0F073] border border-solid border-grayish-100 rounded-lg text-gray-500 placeholder-grayish-100 outline-none transition-all duration-200 ${
                    errors.firstName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
              </div>
              {errors.firstName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.firstName}
                </motion.p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-1 w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter LastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className={`w-full px-4 py-3 bg-[#F0F0F073] border border-solid border-grayish-100 rounded-lg text-gray-500 placeholder-grayish-100 outline-none transition-all duration-200 ${
                    errors.lastName
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                />
              </div>
              {errors.lastName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.lastName}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 bg-[#F0F0F073] border border-solid border-grayish-100 rounded-lg text-gray-500 placeholder-grayish-100 outline-none transition-all duration-200 ${
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

            {/* Terms Agreement */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between w-full text-sm pt-3"
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={(e) =>
                      handleInputChange("agreeToTerms", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                      formData.agreeToTerms
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-blue-500"
                    }`}
                  >
                    {formData.agreeToTerms && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-gray-600">
                  I agree to Handy_me's{" "}
                  <a href="#" className="text-primary font-bold">
                    Terms & Conditions
                  </a>
                </span>
              </label>
            </motion.div>
            {errors.agreeToTerms && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm"
              >
                {errors.agreeToTerms}
              </motion.p>
            )}

            <div className="py-5">
              <AnimatedButton
                disabled={isLoading}
                className="w-full rounded-md"
                onClick={() => console.log("")}
                // type="submit"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Continue...</span>
                  </div>
                ) : (
                  "Continue"
                )}
              </AnimatedButton>
            </div>

            <motion.div variants={itemVariants} className="relative my-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500">Or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="button"
              className="w-full bg-transparent text-gray-700 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-none border-none outline-none focus:outline-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span>Continue with Google</span>
            </motion.button>
          </motion.form>

          <motion.p
            variants={itemVariants}
            className="text-center text-sm text-gray-600 mt-16 pt-8"
          >
            Already have an account?{" "}
            <Link
              to={RouterConstantUtil.page.auth.login}
              className="text-teal-500 hover:text-teal-600 font-medium transition-colors"
            >
              Sign in
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

interface PhoneVerificationProps {
  formData: CompleteFormData;
  updateFormData: (updates: Partial<CompleteFormData>) => void;
  onNext: () => void;
  onBack: () => void;
  errors: FormErrors;
  isLoading: boolean;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  formData,
  updateFormData,
  onNext,
  onBack,
  errors,
  isLoading,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showCountryDropdown, setShowCountryDropdown] =
    useState<boolean>(false);
  const [passwordValidation, setPasswordValidation] = useState({
    hasMinLength: false,
    hasUpperAndLower: false,
  });

  const selectedCountry =
    countries.find((c) => c.code === formData.countryCode) || countries[0];

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperAndLower = /^(?=.*[a-z])(?=.*[A-Z])/.test(password);

    setPasswordValidation({
      hasMinLength,
      hasUpperAndLower,
    });

    return { hasMinLength, hasUpperAndLower };
  };

  const handleInputChange = (field: keyof CompleteFormData, value: string) => {
    updateFormData({ [field]: value });

    if (field === "password") {
      validatePassword(value);
    }
  };

  const handleCountrySelect = (country: Country) => {
    updateFormData({ countryCode: country.code });
    setShowCountryDropdown(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
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
      <motion.div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-xl"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="w-full h-full bg-cover bg-center relative min-h-[70vh]"
          style={{
            backgroundImage: `url('/images/AUTHIMG3.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <motion.div
            className="absolute bottom-16 left-8 right-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg px-6 py-4 max-w-sm">
              <h3 className="text-[20px] font-semibold text-[#1E2B3A] mb-2">
                Need a hand? Get one in minutes.
              </h3>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-md space-y-6">
          <motion.div variants={itemVariants} className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-[#1E2B3A]">
              You are almost there
            </h1>
            <p className="text-[#1E2B3A] text-base">
              Complete your setup and start booking
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-5 w-full"
          >
            {/* Phone Number Input */}
            <div className="space-y-1">
              <div className="relative">
                <div className="flex">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setShowCountryDropdown(!showCountryDropdown)
                      }
                      className="flex items-center space-x-2 px-3 py-[14px] bg-[#F0F0F073] border border-r-0 border-gray-300 rounded-l-lg hover:bg-gray-100 transition-colors"
                    >
                      <img src={selectedCountry.flag} className="" />
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>

                    {showCountryDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-28 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-left transition-colors"
                          >
                            <img src={country.flag} className="text-lg" />
                            <span className="text-sm text-gray-500">
                              {country.dialCode}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                      {selectedCountry.dialCode}
                    </span>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      className={`w-full pl-16 pr-4 py-3.5 bg-[#F0F0F073] border border-gray-300 rounded-r-lg text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 ${
                        errors.phoneNumber ? "border-red-500 bg-red-50" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
              {errors.phoneNumber && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.phoneNumber}
                </motion.p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full px-4 py-3.5 pr-12 bg-[#F0F0F073] border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 ${
                    errors.password ? "border-red-500 bg-red-50" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={`w-full px-4 py-3.5 pr-12 bg-[#F0F0F073] border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 outline-none transition-all duration-200 ${
                    errors.confirmPassword ? "border-red-500 bg-red-50" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    passwordValidation.hasMinLength
                      ? "bg-brandprimary border-primary"
                      : "border-gray-300"
                  }`}
                >
                  {passwordValidation.hasMinLength && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    passwordValidation.hasMinLength
                      ? "text-primary"
                      : "text-gray-500"
                  }`}
                >
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                    passwordValidation.hasUpperAndLower
                      ? "bg-brandprimary border-primary"
                      : "border-gray-300"
                  }`}
                >
                  {passwordValidation.hasUpperAndLower && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    passwordValidation.hasUpperAndLower
                      ? "text-primary"
                      : "text-gray-500"
                  }`}
                >
                  Both upper and lower case letters
                </span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3.5 px-4 rounded-lg transition-all duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-brandprimary hover:bg-brandprimary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-lg transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

const SignupFlow = () => {
  const [currentStep, setCurrentStep] = useState<SignupStep>(
    SignupStep.BASIC_SIGNUP
  );
  const [formData, setFormData] = useState<CompleteFormData>({
    firstName: "",
    lastName: "",
    email: "",
    agreeToTerms: false,
    phoneNumber: "",
    countryCode: "US",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { register } = useAuthState();
  const navigate = useNavigate();

  const updateFormData = (updates: Partial<CompleteFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));

    const updatedFields = Object.keys(updates);
    if (updatedFields.some((field) => errors[field as keyof FormErrors])) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        updatedFields.forEach((field) => {
          delete newErrors[field as keyof FormErrors];
        });
        return newErrors;
      });
    }
  };

  const validateBasicSignup = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    return newErrors;
  };

  const validatePhoneVerification = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10,15}$/.test(formData.phoneNumber.replace(/\D/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else {
      const hasMinLength = formData.password.length >= 8;
      const hasUpperAndLower = /^(?=.*[a-z])(?=.*[A-Z])/.test(
        formData.password
      );
      if (!hasMinLength || !hasUpperAndLower) {
        newErrors.password = "Password must meet all requirements";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  // Step navigation handlers
  const handleBasicSignupNext = () => {
    const validationErrors = validateBasicSignup();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setCurrentStep(SignupStep.PHONE_VERIFICATION);
  };

  const handlePhoneVerificationNext = async () => {
    const validationErrors = validatePhoneVerification();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const selectedCountry =
        countries.find((c) => c.code === formData.countryCode) || countries[0];
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: selectedCountry.dialCode + formData.phoneNumber,
        // countryCode: formData.countryCode,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        // agreeToTerms: formData.agreeToTerms,
      };

      await register(payload);

      toast.success("Success, we've sent OTP to your mail!");
      setCurrentStep(SignupStep.OTP_VERIFICATION);
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({
        phoneNumber:
          (error as any)?.response?.data?.message ??
          "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setErrors({});
    switch (currentStep) {
      case SignupStep.PHONE_VERIFICATION:
        setCurrentStep(SignupStep.BASIC_SIGNUP);
        break;
      case SignupStep.OTP_VERIFICATION:
        setCurrentStep(SignupStep.PHONE_VERIFICATION);
        break;
      default:
        break;
    }
  };

  const handleSuccessModalComplete = () => {
    setShowSuccessModal(false);
    navigate(RouterConstantUtil.page.home);
  };

  // Render current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case SignupStep.BASIC_SIGNUP:
        return (
          <BasicSignup
            formData={formData}
            updateFormData={updateFormData}
            onNext={handleBasicSignupNext}
            errors={errors}
            isLoading={isLoading}
          />
        );

      case SignupStep.PHONE_VERIFICATION:
        return (
          <PhoneVerification
            formData={formData}
            updateFormData={updateFormData}
            onNext={handlePhoneVerificationNext}
            onBack={handleBack}
            errors={errors}
            isLoading={isLoading}
          />
        );
      case SignupStep.OTP_VERIFICATION:
        return (
          <OTPVerification
            email={formData.email}
            setShowSuccessModal={setShowSuccessModal}
          />
        );

      default:
        return null;
    }
  };

  return (
    <AuthLayout>
      {renderCurrentStep()}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalComplete}
        title={modalConfigs.signup.title}
        description={modalConfigs.signup.description}
        ctaText={modalConfigs.signup.ctaText}
        onCtaClick={handleSuccessModalComplete}
      />
    </AuthLayout>
  );
};

export default SignupFlow;
