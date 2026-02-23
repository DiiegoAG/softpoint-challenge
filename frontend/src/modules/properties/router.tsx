import { lazy } from "react";

import RequireAuth from "@/middlewares/RequireAuth";

const PropertiesPage = lazy(() => import("./pages/PropertiesPage"));
const PropertyPage = lazy(() => import("./pages/PropertyPage"));

const PropertiesRoutes = [
    {
        element: <RequireAuth />,
        children: [
            {
                path: "/properties",
                element: <PropertiesPage />,
            },
            {
                path: "/properties/:id",
                element: <PropertyPage />,
            },
        ],
    },
]

export default PropertiesRoutes;
