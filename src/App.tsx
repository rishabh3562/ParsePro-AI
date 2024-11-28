import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FRONTEND_ROUTES } from "./routes";
import Layout from "./components/Outlet";
import { Wrapper } from "./components/Wrapper";
const Home = lazy(() => import("./pages/Home"));
const Upload = lazy(() => import("./pages/Upload"));
const NotFound = lazy(() => import("./pages/NotFound"));

const routes = [
  {
    path: "/",
    element: <Wrapper element={<Layout />} />,
    children: [
      {path: FRONTEND_ROUTES.LANDING,element:<Wrapper element={<Home />} />},
      { path: FRONTEND_ROUTES.UPLOAD, element: <Wrapper element={<Upload />} /> },
      { path: FRONTEND_ROUTES.NOT_FOUND, element: <Wrapper element={<NotFound />} /> },
    ],
  },
];

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
