import React from "react";
import { Routes } from "@/router/Routes";

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

const initRoute = [] as RouteType[];

export const allRoutes = initRoute.concat(Routes);
