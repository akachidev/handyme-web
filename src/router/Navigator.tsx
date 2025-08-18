import React from "react";
import { Navigate } from "react-router-dom";

type NavigatorProps = {
  redirectTo?: string;
  elem: React.JSX.Element;
  path: string;
};

export const RouteNavigator = ({ redirectTo, elem }: NavigatorProps) => {
  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  return elem;
};
