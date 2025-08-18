export type RouteType = {
  path: string;
  component: React.ComponentType;
  metadata?: Options;
};

type Options = {
  hasSidebredirectOnNoAuthToar?: string;
  redirectTo?: string;
  isAuth: boolean;
  hasSidebar?: boolean;
};

export interface CTAButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
  dialCode: string;
}

export interface Review {
  id: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  review: string;
  location: string;
  date: string;
}

export interface BookingCardProps {
  id: string;
  title: string;
  price: number;
  providerName: string;
  providerAvatar: string;
  serviceImage: string;
  location: string;
  rating: number;
  date: string;
  time: string;
  status: "Ongoing" | "Completed" | "Pending" | "Cancelled";
  onClick: () => void;
}
