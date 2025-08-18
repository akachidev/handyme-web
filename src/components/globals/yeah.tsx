import { Bell, Menu, User, X, Calendar, Lock } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
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
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = "sm" }) => {
  const sizeClasses = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  const iconSize = size === "sm" ? "w-5 h-5" : "w-6 h-6";

  return (
    <div
      className={`${sizeClasses} bg-gray-400 rounded-full flex items-center justify-center overflow-hidden`}
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

interface NotificationBellProps {
  onClick: () => void;
  hasNotifications: boolean;
}

const NotificationBell: React.FC<NotificationBellProps> = ({
  onClick,
  hasNotifications,
}) => {
  return (
    <motion.button
      className="relative p-2 bg-transparent border-none cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <Bell className="w-5 h-5" color="#00C2A8" fill="#00C2A8" />
      {hasNotifications && (
        <motion.span
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
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
      className="md:hidden p-2 hover:bg-slate-600 rounded-lg transition-colors duration-300 relative"
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

interface NotificationItem {
  id: string;
  type: "booking" | "security";
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking":
        return <Calendar className="w-5 h-5 text-[#00C2A8]" />;
      case "security":
        return <Lock className="w-5 h-5 text-[#00C2A8]" />;
      default:
        return <Calendar className="w-5 h-5 text-[#00C2A8]" />;
    }
  };

  const groupedNotifications = notifications.reduce((acc, notification) => {
    if (!acc["Today"]) acc["Today"] = [];
    acc["Today"].push(notification);
    return acc;
  }, {} as Record<string, NotificationItem[]>);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed top-16 right-3 md:right-4 z-50 w-[calc(100vw-24px)] md:w-96 max-h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <motion.button
                className="text-[#00C2A8] text-sm font-medium hover:text-[#00a892] transition-colors"
                onClick={onMarkAllAsRead}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Mark All as read
              </motion.button>

              <motion.button
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-500" />
              </motion.button>
            </div>

            {/* Notifications List */}
            <div className="max-h-[60vh] overflow-y-auto">
              {Object.entries(groupedNotifications).map(([date, items]) => (
                <div key={date}>
                  <div className="px-4 py-3 text-sm font-medium text-[#363636] bg-gray-50 border-b border-gray-100">
                    {date}
                  </div>

                  {items.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      className={`flex items-start gap-3 p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${
                        !notification.isRead ? "bg-blue-50" : ""
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-[#363636] mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>

                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {notification.time}
                      </span>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = React.useState(false);
  const [activeNav, setActiveNav] = React.useState("Home");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleNavClick = (navName: string) => {
    setActiveNav(navName);
    setIsMobileMenuOpen(false);
    console.log(`Navigate to: ${navName}`);
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const isAuthenticated = true;
  const user = {
    name: "Anita Anaekwe Dada",
    avatar: "",
    location: "Awka, Anambra state, Nigeria",
  };

  const [notifications, setNotifications] = React.useState<NotificationItem[]>([
    {
      id: "1",
      type: "booking",
      title: "Bookings complete",
      message: "You have successfully booked the service...",
      time: "4hr",
      isRead: false,
    },
    {
      id: "2",
      type: "security",
      title: "You changed your password",
      message: "You have successfully changed your password...",
      time: "7hr",
      isRead: false,
    },
    {
      id: "3",
      type: "booking",
      title: "Bookings complete",
      message: "You have successfully booked the service...",
      time: "4hr",
      isRead: false,
    },
    {
      id: "4",
      type: "security",
      title: "You changed your password",
      message: "You have successfully changed your password...",
      time: "7hr",
      isRead: false,
    },
  ]);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "Bookings", to: "/bookings" },
    { name: "Messages", to: "/messages" },
  ];

  const hasUnreadNotifications = notifications.some((n) => !n.isRead);

  return (
    <>
      <motion.header
        className="bg-[#1E2B3A] text-white m-3 rounded-xl shadow-sm cursor-pointer relative z-10"
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
              <div className="w-8 h-8 flex items-center justify-center bg-[#00C2A8] rounded-full">
                <span className="text-white font-bold text-sm">H</span>
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
                    onClick={() => handleNavClick(item.name)}
                  >
                    {item.name}
                  </NavItem>
                ))}
              </nav>
            )}

            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <>
                  <div className="hidden md:flex items-center space-x-3">
                    <NotificationBell
                      onClick={toggleNotification}
                      hasNotifications={hasUnreadNotifications}
                    />

                    <motion.div
                      className="flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <UserAvatar user={user} />
                      <motion.span className="flex justify-center items-center text-center">
                        <span className="text-[#00C2A8]">📍</span>
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
                  <UserAvatar user={user} size="md" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <motion.span className="flex justify-center items-center text-center">
                        <span className="text-[#00C2A8]">📍</span>
                      </motion.span>
                      <span className="text-sm font-medium">
                        {user?.location}
                      </span>
                    </div>
                  </div>
                  <NotificationBell
                    onClick={toggleNotification}
                    hasNotifications={hasUnreadNotifications}
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
                        onClick={() => handleNavClick(item.name)}
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
      </motion.header>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={markAllAsRead}
      />
    </>
  );
};

export default Header;
