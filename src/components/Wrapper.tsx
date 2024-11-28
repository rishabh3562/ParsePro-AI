import React, { Suspense, ReactNode } from "react";
import { Outlet, Navigate } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";
import { Oval } from "react-loader-spinner";
interface ProtectedRouteProps {
  isAuth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

interface FallbackProps {
  element: ReactNode;
}

const Fallback: React.FC<FallbackProps> = ({ element }) => (
  <ErrorBoundary>
    <Suspense fallback={<div className="flex justify-center items-center h-full">
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#3949ab"
        ariaLabel="oval-loading"
        secondaryColor="#626ebc"
      />
    </div>}>{element}</Suspense>
  </ErrorBoundary>
);

interface WrapperProps {
  element: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ element }) => {
  return (
    <ErrorBoundary>
      <Fallback element={element} />
    </ErrorBoundary>
  );
};

export { ProtectedRoute, Fallback, Wrapper };
