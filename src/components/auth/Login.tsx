import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { RouterConstantUtil } from "@/lib/RouterConstantUtils";
import { Link } from "react-router";
import { AnimatedButton } from "../ui/AnimatedButton";
import { useAuthState } from "@/hooks/useAuthState";
import { toast } from "react-toastify";

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthState();

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      await login(formData.email, formData.password);
      toast.success("Login sucessful!");
    } catch (error) {
      console.log(error, "login");
      const errMsg =
        (error as any)?.response?.data?.message ||
        "Failed to send OTP. Please try again.";
      toast.error(errMsg);
      setErrors({
        email: errMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
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
    <div className=" flex py-10 w-full lg:max-w-[80%]  mx-auto gap-20 ">
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
            className="absolute bottom-[6rem]  right-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white/[31%] bg-opacity-90 backdrop-blur-sm rounded-lg px-6 py-2 max-w-sm ">
              <h3 className="text-[20px] font-semibold text-[#1E2B3A] ">
                Everyday help, anytime
              </h3>
              <p className="text-[#2C2C2E] text-[16px] font-medium ">
                Find trusted local experts for all your daily tasks, from
                cleaning back to running errands.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Login Form */}
      <motion.div
        className="w-full lg:w-1/2 flex  justify-center px-4 py-8 overflow-hidden  "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-lg space-y-6  ">
          <motion.div variants={itemVariants} className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4"></div>
            <h1 className="text-2xl font-semibold text-[#1E2B3A]">
              Welcome back 👋
            </h1>
            <p className="text-[#1E2B3A] text-sm">Let's get you some help</p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="space-y-4 w-full "
          >
            <div className="space-y-1">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
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

            <div className="space-y-1 w-full ">
              <div className="relative ">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full px-4 py-3.5 bg-[#F0F0F073] border border-solid border-grayish-100 rounded-lg text-gray-500 placeholder-grayish-100 outline-none transition-all duration-200 ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
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

            <motion.div
              variants={itemVariants}
              className="flex items-center justify-between w-full text-sm pt-8"
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) =>
                      handleInputChange("rememberMe", e.target.checked)
                    }
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                      formData.rememberMe
                        ? "bg-blue-500 border-blue-500"
                        : "bg-white border-blue-500"
                    }`}
                  >
                    {formData.rememberMe && (
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
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link
                to={RouterConstantUtil.page.auth.resetpassword}
                className="text-primary hover:text-primary transition-colors"
              >
                Forgot Password?
              </Link>
            </motion.div>

            <AnimatedButton
              disabled={isLoading}
              className="w-full rounded-md"
              type="submit"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Signin"
              )}
            </AnimatedButton>

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
            Don't have an account?{" "}
            <Link
              to={RouterConstantUtil.page.auth.signup}
              className="text-teal-500 hover:text-teal-600 font-medium transition-colors"
            >
              Sign up
            </Link>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginScreen;
