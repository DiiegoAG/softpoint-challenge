import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "./layouts/MainLayout";

import DashboardRoutes from "./modules/dashboard/router";
import AuthRoutes from "./modules/auth/router";

const NotFound = lazy(() => import("./pages/NotFound"));

const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            ...DashboardRoutes,
            ...AuthRoutes,
        ],
    },

    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
