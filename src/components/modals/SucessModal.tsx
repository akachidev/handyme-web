import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  showCloseButton?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Verified",
  description = "You have successfully verified your phone number",
  ctaText = "Login",
  onCtaClick,
  showCloseButton = true,
  autoClose = false,
  autoCloseDelay = 3000,
}) => {
  React.useEffect(() => {
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDelay, isOpen, onClose]);

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      onClose();
    }
  };

  const rippleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1.5, 2],
      opacity: [0.3, 0.2, 0],
      transition: {
        delay: 0.3,
        duration: 1.5,
        repeat: Infinity,
        repeatDelay: 0.5,
      },
    },
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full mx-auto bg-white rounded-2xl border-none shadow-2xl p-0">
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100 z-10"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="px-8 py-10 text-center">
          <div className="relative flex items-center justify-center mb-6">
            <motion.div
              className="absolute w-24 h-24 border-2 border-teal-200 rounded-full"
              variants={rippleVariants}
              initial="hidden"
              animate="visible"
            />
            <motion.div
              className="absolute w-20 h-20 border-2 border-teal-300 rounded-full"
              variants={rippleVariants}
              initial="hidden"
              animate="visible"
              style={{ animationDelay: "0.2s" }}
            />

            <img src="/icons/ICON2.png" className="h-32 w-32" alt="handyme" />
          </div>

          <motion.h2
            className="text-2xl font-semibold text-[#0A0B0D] mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-[#4A4863] text-base leading-relaxed mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {description}
          </motion.p>

          <motion.button
            onClick={handleCtaClick}
            className="w-full bg-[#00C2A8] hover:bg-[#00A896] text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {ctaText}
          </motion.button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
