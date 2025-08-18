import { lazy } from "react";
import type { RouteType } from "types/global";
import { RouterConstantUtil } from "@/lib/RouterConstantUtils";
import NotFoundPage from "@/view/Notfound";

const Home = lazy(() => import("@/view/Home"));
const Login = lazy(() => import("@/view/Login"));
const Signup = lazy(() => import("@/view/Signup"));
const ResetPassword = lazy(() => import("@/view/ResetPassword"));
const AroundYou = lazy(() => import("@/view/AroundYou"));
const TopRated = lazy(() => import("@/view/TopRated"));
const Recommended = lazy(() => import("@/view/Recommended"));
import ArtisanProfile from "@/view/ArtisanProfile";

export const Routes: RouteType[] = [
  {
    path: RouterConstantUtil.page.home,
    component: Home,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.auth.login,
    component: Login,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.auth.signup,
    component: Signup,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.auth.resetpassword,
    component: ResetPassword,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.aroundYou,
    component: AroundYou,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.recommended,
    component: Recommended,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.topRated,
    component: TopRated,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.artisan,
    component: ArtisanProfile,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.notFound,
    component: NotFoundPage,
    metadata: { isAuth: false },
  },
];
