import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import toast from "react-hot-toast";

export default function RequireAuth() {
    const token = useAuthStore((state: { token: string | null }) => state.token);
    const location = useLocation();

    if (!token) {
        toast.error("You must be logged in to access this page.");

        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
}
