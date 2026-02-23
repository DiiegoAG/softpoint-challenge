import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
    Home,
    LayoutDashboard,
    Building2,
    LogOut,
    ChevronRight,
    User as UserIcon,
    Menu,
    X
} from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import toast from 'react-hot-toast';

const Sidebar = () => {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Close sidebar when route changes on mobile
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const handleLogout = () => {
        navigate('/login');
        toast.success('Sesión cerrada correctamente');
        setTimeout(() => {
            logout();
        }, 1000);
    };

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { label: 'Properties', icon: Building2, path: '/properties' },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-[60] md:hidden p-3 rounded-xl bg-blue-600 shadow-lg text-white transition-all active:scale-90"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`
                fixed left-0 top-0 h-screen w-64 backdrop-blur-2xl bg-white/10 border-r border-white/20 flex flex-col z-50 transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                {/* Logo */}
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg">
                            <Home className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-white tracking-tight">
                            Soft<span className="text-blue-400">Point</span>
                        </span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 py-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                group flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300
                                ${isActive
                                    ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white border border-blue-500/30'
                                    : 'text-blue-100/60 hover:bg-white/5 hover:text-white'
                                }
                            `}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className="transition-transform group-hover:scale-110" />
                                <span className="font-semibold text-sm">{item.label}</span>
                            </div>
                            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </NavLink>
                    ))}
                </nav>

                {/* Footer / User Profile */}
                <div className="p-4 mt-auto border-t border-white/10 bg-black/10">
                    <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
                        <div className="flex items-center gap-3 min-w-0">
                            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-400/20">
                                <UserIcon size={20} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold text-white truncate">
                                    {user?.name || 'Usuario'}
                                </span>
                                <span className="text-[10px] text-blue-100/40 font-bold truncate">
                                    {user?.email || 'admin@example.com'}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            title="Logout"
                            className="flex-shrink-0 p-2 rounded-xl text-red-400 hover:bg-red-500/10 transition-all active:scale-95"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
