import { lazy } from "react";

const LoginPage = lazy(() => import("./pages/LoginPage"));

const AuthRoutes = [
    {
        path: "/login",
        element: <LoginPage />,
    },
]

export default AuthRoutes;
