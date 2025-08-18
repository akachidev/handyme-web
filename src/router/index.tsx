import { Route, Routes } from "react-router-dom";
import type { RouteType } from "types/global";
import { allRoutes } from "./Routter";
import { RouteNavigator } from "./Navigator";
import NotFoundPage from "@/view/Notfound";
import ScrollToTop from "@/components/globals/ScrollToTop";
import { ToastContainer } from "react-toastify";

export const AppRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {allRoutes.map((item: RouteType, index: number) => {
          const Element = item.component;
          return (
            <Route
              key={index}
              path={item.path}
              element={
                <RouteNavigator
                  path={item.path}
                  redirectTo={item?.metadata?.redirectTo}
                  elem={<Element />}
                />
              }
            />
          );
        })}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
};
