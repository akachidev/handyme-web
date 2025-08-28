import React, { useState, useRef, useEffect } from "react";
import { X, Calendar, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock notification data
const notifications = [
  {
    id: 1,
    type: "booking",
    icon: Calendar,
    title: "Bookings complete",
    description: "You have successfully booked the service...",
    time: "4hr",
    unread: true,
    bgColor: "#00C2A81A",
  },
  {
    id: 2,
    type: "security",
    icon: Lock,
    title: "You changed your password",
    description: "You have successfully changed your password...",
    time: "7hr",
    unread: true,
    bgColor: "#00C2A81A",
  },
  {
    id: 3,
    type: "booking",
    icon: Calendar,
    title: "Bookings complete",
    description: "You have successfully booked the service...",
    time: "4hr",
    unread: false,
    bgColor: "#00C2A81A",
  },
  {
    id: 4,
    type: "security",
    icon: Lock,
    title: "You changed your password",
    description: "You have successfully changed your password...",
    time: "7hr",
    unread: false,
    bgColor: "#00C2A81A",
  },
  {
    id: 5,
    type: "booking",
    icon: Calendar,
    title: "Bookings complete",
    description: "You have successfully booked the service...",
    time: "4hr",
    unread: false,
    bgColor: "#00C2A81A",
  },
  {
    id: 6,
    type: "security",
    icon: Lock,
    title: "You changed your password",
    description: "You have successfully changed your password...",
    time: "7hr",
    unread: false,
    bgColor: "#00C2A81A",
  },
];

interface NotificationItemProps {
  notification: (typeof notifications)[0];
  index: number;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  index,
}) => {
  const IconComponent = notification.icon;

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200 cursor-pointer"
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: notification.bgColor }}
      >
        <IconComponent className="w-6 h-6 text-[#00C2A8]" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-[#1E2B3A] mb-1">
              {notification.title}
            </h4>
            <p className="text-sm text-[#444444] line-clamp-2">
              {notification.description}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
            <span className="text-xs text-[#6CA0FE]">{notification.time}</span>
            {notification.unread && (
              <div className="w-2 h-2 bg-[#00C2A8] rounded-full"></div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement>;
}

const Notification: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  triggerRef,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 85, left: "", right: 10 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && triggerRef.current && !isMobile) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      setPosition({
        top: triggerRect.bottom + scrollTop + 8,
        left: "auto",
        right: window.innerWidth - triggerRect.right,
      });
    }
  }, [isOpen, triggerRef, isMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = isMobile ? "hidden" : "auto";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose, triggerRef, isMobile]);

  const groupNotificationsByDate = () => {
    return [{ date: "Today", notifications }];
  };

  const groupedNotifications = groupNotificationsByDate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          {isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden "
              onClick={onClose}
            />
          )}

          <motion.div
            ref={modalRef}
            initial={
              isMobile
                ? { y: "100%", opacity: 0 }
                : { scale: 0.95, opacity: 0, y: -10 }
            }
            animate={
              isMobile ? { y: 0, opacity: 1 } : { scale: 1, opacity: 1, y: 0 }
            }
            exit={
              isMobile
                ? { y: "100%", opacity: 0 }
                : { scale: 0.95, opacity: 0, y: -10 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`
              bg-white rounded-xl shadow-xl border border-gray-200 z-50
              ${
                isMobile
                  ? "fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-b-none"
                  : "fixed w-80 max-h-[90vh]"
              }
            `}
            style={
              !isMobile
                ? {
                    top: position.top,
                    right: position.right,
                  }
                : {}
            }
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 ">
              <div className="flex items-center space-x-2">
                <h3 className="text-[15px] font-semibold text-[#00C2A8]">
                  Mark All as read
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 bg-black rounded-full transition-colors duration-200"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>

            {/* Content */}
            <div
              className={`overflow-y-auto ${
                isMobile ? "max-h-[calc(85vh-80px)]" : "max-h-[70vh]"
              }`}
            >
              <div className="p-2">
                {groupedNotifications.map((group, _) => (
                  <div key={group.date} className="mb-4 last:mb-0">
                    <h4 className="text-sm font-medium text-gray-900 px-2 py-2 sticky top-0 bg-white">
                      {group.date}
                    </h4>
                    <div className="space-y-1">
                      {group.notifications.map((notification, index) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                          index={index}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile handle bar */}
            {isMobile && (
              <div className="flex justify-center py-2">
                <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Notification;
