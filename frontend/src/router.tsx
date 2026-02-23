import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "./layouts/MainLayout";

import DashboardRoutes from "./modules/dashboard/router";
import AuthRoutes from "./modules/auth/router";
import PropertiesRoutes from "./modules/properties/router";

const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
    ...AuthRoutes,
    {
        element: <MainLayout />,
        children: [
            ...DashboardRoutes,
            ...PropertiesRoutes,
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
