// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FRONTEND_ROUTES } from "../utils/routes";

const Home = () => {
  const routesArray = Object.keys(FRONTEND_ROUTES).map((routeKey) => {
    const routePath = FRONTEND_ROUTES[routeKey];
    return (
      <li key={routeKey} className="my-2">
        <Link className="text-blue-500 underline" to={routePath}>
          {routeKey}
        </Link>
      </li>
    );
  });

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-blue-500">This is Home</h1>
      <ul className="mt-4">{routesArray}</ul>
    </div>
  );
};

export default Home;
