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
const Bookings = lazy(() => import("@/view/MyBookings"));
const ArtisanProfile = lazy(() => import("@/view/ArtisanProfile"));
const Account = lazy(() => import("@/view/account"));
const Settings = lazy(() => import("@/view/Settings"));
const Message = lazy(() => import("@/view/Message"));
const Report = lazy(() => import("@/view/ReportIssue"));
const About = lazy(() => import("@/view/About"));
const CancellationPoolicy = lazy(() => import("@/view/Cancellation"));
const PrivacyPolicy = lazy(() => import("@/view/PrivacyPolicy"));
const Booking = lazy(() => import("@/view/Booking"));

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
    path: RouterConstantUtil.page.mybookings,
    component: Bookings,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.account,
    component: Account,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.settings,
    component: Settings,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.messages,
    component: Message,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.report,
    component: Report,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.cancellation,
    component: CancellationPoolicy,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.privacy,
    component: PrivacyPolicy,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.about,
    component: About,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.booking,
    component: Booking,
    metadata: { isAuth: false },
  },
  {
    path: RouterConstantUtil.page.notFound,
    component: NotFoundPage,
    metadata: { isAuth: false },
  },
];
