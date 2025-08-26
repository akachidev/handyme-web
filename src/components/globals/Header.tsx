import { Bell, Menu, User, X } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RouterConstantUtil } from "@/lib/RouterConstantUtils";
import { useNavigate } from "react-router-dom";
import { AnimatedButton } from "../ui/AnimatedButton";
import Notification from "../modals/Notifications";
import AccountModal from "../modals/Account";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

interface NotificationBellProps {
  onClick: () => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}

const NavItem: React.FC<NavItemProps> = ({
  children,
  isActive = false,
  className = "",
  onClick,
}) => {
  const baseClasses =
    "relative transition-colors duration-300 py-2 cursor-pointer";
  const activeClasses = isActive
    ? "text-teal-400"
    : "text-white hover:text-teal-300";

  return (
    <div
      className={`${baseClasses} ${activeClasses} ${className}`}
      onClick={onClick}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-teal-400"
        initial={{ width: 0 }}
        animate={{ width: isActive ? "100%" : 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </div>
  );
};

interface UserAvatarProps {
  user: { name: string; avatar: string };
  size?: "sm" | "md";
  ctaClick: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  size = "sm",
  ctaClick,
}) => {
  const sizeClasses = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const iconSize = size === "sm" ? "w-5 h-5" : "w-6 h-6";

  return (
    <div
      className={`${sizeClasses} bg-gray-400 rounded-full flex items-center justify-center overflow-hidden`}
      role="button"
      onClick={ctaClick}
    >
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <User className={`${iconSize} text-gray-600`} />
      )}
    </div>
  );
};

const NotificationBell: React.FC<NotificationBellProps> = ({
  onClick,
  triggerRef,
}) => {
  return (
    <motion.button
      ref={triggerRef}
      className="relative p-2 bg-transparent border-none cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <Bell className="w-5 h-5" color="#00C2A8" fill="#00C2A8" />
      <motion.span
        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.button>
  );
};

interface HamburgerMenuProps {
  isOpen: boolean;
  onClick: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      className="md:hidden p-2 hover:bg-brandsecondary rounded-lg transition-colors duration-300 relative"
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="w-6 h-6 text-white" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="w-6 h-6 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState("Home");
  const navigate = useNavigate();
  const [openNotification, setIsOpenNotification] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [openAccount, setOpenAccount] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (path: string, navName: string) => {
    setActiveNav(navName);
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const isAuthenticated = true;
  const user = {
    name: "Anita Anaekwe Dada",
    avatar: "",
    location: "Awka, Anambra state, Nigeria",
  };

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Bookings", to: RouterConstantUtil.page.mybookings },
    { name: "Messages", to: RouterConstantUtil.page.messages },
  ];

  return (
    <motion.header
      className="bg-[#1E2B3A] text-white m-3 rounded-xl shadow-sm cursor-pointer"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/logo.png" className="w-8 h-8" alt="Handy Me Logo" />
            </div>
            <span className="text-lg font-medium">Handy_me</span>
          </motion.div>

          {isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.name}
                  to={item.to}
                  isActive={activeNav === item.name}
                  onClick={() => handleNavClick(item.to, item.name)}
                >
                  {item.name}
                </NavItem>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <AnimatedButton
                className="rounded-full text-[14px]"
                onClick={() => navigate(RouterConstantUtil.page.auth.login)}
              >
                Login your account
              </AnimatedButton>
            ) : (
              <>
                <div className="hidden md:flex items-center space-x-3">
                  <NotificationBell
                    triggerRef={triggerRef as any}
                    onClick={() => setIsOpenNotification(true)}
                  />

                  <motion.div
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <UserAvatar
                      user={user}
                      ctaClick={() => setOpenAccount(true)}
                    />
                    <motion.span className="flex justify-center items-center text-center">
                      <img src="/icons/location.png" className="h-5 w-4" />
                    </motion.span>
                    <span className="text-sm max-w-[120px] truncate">
                      {user?.location}
                    </span>
                  </motion.div>
                </div>

                {/* Mobile Menu Button */}
                <HamburgerMenu
                  isOpen={isMobileMenuOpen}
                  onClick={toggleMobileMenu}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isAuthenticated && isMobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-slate-600 bg-slate-700 overflow-hidden rounded-b-xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-4 space-y-4">
              <motion.div
                className="flex items-center space-x-3 pb-4 border-b border-slate-600"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <UserAvatar user={user} ctaClick={() => setOpenAccount(true)} />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <motion.span className="flex justify-center items-center text-center">
                      <img src="/icons/location.png" className="h-5 w-4" />
                    </motion.span>
                    <span className="text-sm font-medium">
                      {user?.location}
                    </span>
                  </div>
                </div>
                <NotificationBell
                  triggerRef={triggerRef as any}
                  onClick={() => setIsOpenNotification(true)}
                />
              </motion.div>

              {/* Mobile Navigation */}
              <nav className="space-y-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                  >
                    <NavItem
                      to={item.to}
                      isActive={activeNav === item.name}
                      className="block"
                      onClick={() => handleNavClick(item.to, item.name)}
                    >
                      {item.name}
                    </NavItem>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {openNotification && (
        <Notification
          isOpen={openNotification}
          onClose={() => setIsOpenNotification(false)}
          triggerRef={triggerRef as any}
        />
      )}
      {openAccount && (
        <AccountModal
          isOpen={openAccount}
          onClose={() => setOpenAccount(false)}
        />
      )}
    </motion.header>
  );
};

export default Header;
