import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen bg-[#0f172a]">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 relative min-h-screen">
                <div className="p-4 pt-12 md:p-0">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
