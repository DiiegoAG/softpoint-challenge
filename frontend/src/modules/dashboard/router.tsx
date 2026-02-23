import { lazy } from "react";

import RequireAuth from "@/middlewares/RequireAuth";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));

const DashboardRoutes = [
    // {
    //     path: "/",
    //     element: <DashboardPage />,
    // },

    {
        element: <RequireAuth />,
        children: [
            {
                path: "/",
                element: <DashboardPage />,
            },
        ],
    },
]

export default DashboardRoutes;
