import React, { Suspense } from "react";
import { Outlet, Navigate } from "react-router-dom";
import ErrorBoundry from "./ErrorBoundary";
const ProtectedRoute = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const Fallback = ({ element }) => (
  <ErrorBoundry>
    {" "}
    <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
  </ErrorBoundry>
);
const Wrapper = ({ element }) => {
  return (
    <>
      <ErrorBoundry>
        <Fallback element={element} />
      </ErrorBoundry>
    </>
  );
};
export { ProtectedRoute, Fallback, Wrapper };
// export {  Fallback, Wrapper };
