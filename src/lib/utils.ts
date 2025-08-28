import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RouterConstantUtil } from "./RouterConstantUtils";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatCurrency = (amount: number) => {
  return `₦${amount.toLocaleString()}`;
};

export const formatTime = (timeString: string) => {
  return timeString;
};

export const getActiveNavItem = (pathname: string) => {
  if (pathname === "/") return "Home";
  if (pathname === RouterConstantUtil.page.booking) return "Bookings";
  if (pathname === RouterConstantUtil.page.messages) return "Messages";
  return "Home";
};
