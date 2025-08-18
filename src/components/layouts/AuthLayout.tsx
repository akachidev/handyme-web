import { motion } from "framer-motion";
import Header from "../globals/Header";

interface LayoutProps {
  children: React.ReactNode;
  allowAnimation?: boolean;
  className?: string;
}

const AuthLayout: React.FC<LayoutProps> = ({
  children,
  allowAnimation = true,
  className = "",
}) => {
  return (
    <div className={`min-h-screen flex flex-col w-full bg-white ${className}`}>
      <Header />

      <main className="flex-1">
        {allowAnimation ? (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.5,
            }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </main>
    </div>
  );
};

export default AuthLayout;
