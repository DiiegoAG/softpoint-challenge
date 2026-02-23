import { lazy } from "react";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));

const AuthRoutes = [
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]

export default AuthRoutes;
