import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
}) => {
  const variantClasses =
    variant === "primary" ? "bg-primary text-white" : "bg-secondary text-white";
  const disabledClasses = "bg-gray-400 text-white cursor-not-allowed";

  return (
    <motion.button
      type={type}
      className={`${
        disabled ? disabledClasses : variantClasses
      } px-6 py-3 font-bold border-none cursor-pointer overflow-hidden relative ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      disabled={disabled}
    >
      <motion.div
        className="absolute inset-0 bg-white opacity-0"
        whileHover={{ opacity: 0.1 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-600 -translate-x-full"
        whileHover={{ translateX: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
