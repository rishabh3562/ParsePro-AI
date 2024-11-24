import React, { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FRONTEND_ROUTES } from "./utils/routes";
import { Wrapper, ProtectedRoute } from "./components/Wrapper";

// common components
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const routes = [
  {
    path: FRONTEND_ROUTES.DASHBOARD,
    element: <Wrapper element={<Dashboard />} />,
  },
  {
    path: FRONTEND_ROUTES.LANDING,
    element: <Wrapper element={<Home />} />,
  },
  {
    path: FRONTEND_ROUTES.NOT_FOUND,
    element: <Wrapper element={<NotFound />} />,
  },
  {
    path: FRONTEND_ROUTES.HOME,
    element: <Wrapper element={<Home />} />,
  },

  // protected routes example
  // {
  //   path: FRONTEND_ROUTES.DASHBOARD,
  //   element: <ProtectedRoute isAuth={true} />,
  //   children: [
  //     {
  //       path: FRONTEND_ROUTES.PROFILE,
  //       element: <Wrapper element={<Dashboard />} />,
  //     },
  //   ],
  // },
];

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
