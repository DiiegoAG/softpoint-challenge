import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Building2,
    DollarSign,
    Home,
    ArrowRight,
    PieChart as PieIcon,
    Clock
} from 'lucide-react';
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
import { useDashboard } from '../hooks/useDashboard';
import { formatCurrency } from '@/utils/formatCurrency';
import PropertyCard from '@/modules/properties/components/PropertyCard';
import type { Property } from '@/modules/properties/properties.types';
import type { AxiosError } from 'axios';

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899'];

const DashboardPage = () => {
    const navigate = useNavigate();
    const { data: resume, isLoading, error } = useDashboard();

    const chartData = resume ? Object.entries(resume.properties_by_type).map(([name, value]) => ({
        name: name.replace('_', ' ').toUpperCase(),
        value
    })) : [];

    const axiosError = error as AxiosError<{ message: string }>;

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden font-sans pb-20">
            {/* Background with parallax-like effect */}
            <div
                className="fixed inset-0 z-0 scale-105"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.5)'
                }}
            />

            {/* Animated Overlay Circles */}
            <div className="fixed top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" />
            <div className="fixed bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400">
                            <LayoutDashboard size={24} />
                        </div>
                        <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
                            Admin <span className="text-blue-400">Dashboard</span>
                        </h1>
                    </div>
                    <p className="text-blue-100/70 text-lg font-medium">Overview of your real estate performance.</p>
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-12 backdrop-blur-xl bg-red-500/10 border border-red-500/20 p-8 rounded-3xl text-center">
                        <p className="text-red-200 font-medium">
                            Error loading dashboard: {axiosError?.response?.data?.message || axiosError?.message || 'Something went wrong'}
                        </p>
                    </div>
                )}

                {/* Loading State Skeleton */}
                {isLoading && (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-32 backdrop-blur-xl bg-white/5 border border-white/10 rounded-[2rem] animate-pulse" />
                            ))}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl animate-pulse" />
                            ))}
                        </div>
                    </div>
                )}

                {resume && (
                    <>
                        {/* Stats Section */}
                        <div className="space-y-6 mb-12">
                            {/* Primary Cards Row */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Total Properties */}
                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-[2rem] shadow-xl hover:bg-white/10 transition-all cursor-default group flex items-center gap-6">
                                    <div className="p-4 bg-blue-500/20 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform flex-shrink-0">
                                        <Building2 size={32} />
                                    </div>
                                    <div className="space-y-0.5">
                                        <span className="text-blue-100/40 text-[10px] font-bold uppercase tracking-widest block">Total Listings</span>
                                        <div className="text-4xl font-black text-white leading-none">{resume.total_properties}</div>
                                    </div>
                                </div>

                                {/* Average Price */}
                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-[2rem] shadow-xl hover:bg-white/10 transition-all cursor-default group flex items-center gap-6">
                                    <div className="p-4 bg-indigo-500/20 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform flex-shrink-0">
                                        <DollarSign size={32} />
                                    </div>
                                    <div className="space-y-0.5 overflow-hidden">
                                        <span className="text-blue-100/40 text-[10px] font-bold uppercase tracking-widest block">Average Price</span>
                                        <div className="text-2xl md:text-4xl font-black text-white truncate leading-none" title={formatCurrency(resume.average_price)}>
                                            {formatCurrency(resume.average_price)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Distribution Chart Row */}
                            <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-[2rem] shadow-xl flex flex-col md:flex-row items-center gap-12 overflow-hidden">
                                <div className="w-full md:w-1/2 h-[250px] relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={chartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={70}
                                                outerRadius={100}
                                                paddingAngle={8}
                                                dataKey="value"
                                                stroke="none"
                                            >
                                                {chartData.map((_entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '16px',
                                                    backdropFilter: 'blur(10px)',
                                                    color: '#fff'
                                                }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-3xl font-black text-white">{resume.total_properties}</span>
                                        <span className="text-xs text-blue-100/40 font-bold uppercase tracking-wider">Total</span>
                                    </div>
                                </div>

                                <div className="flex-1 w-full space-y-6">
                                    <div className="flex items-center gap-3">
                                        <PieIcon size={20} className="text-blue-400" />
                                        <h3 className="text-blue-100/80 font-bold uppercase tracking-widest text-xs">Inventory Distribution</h3>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {chartData.map((item, index) => (
                                            <div key={item.name} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                                    <span className="text-xs font-bold text-blue-100/60 uppercase tracking-tight">{item.name}</span>
                                                </div>
                                                <span className="text-xl font-black text-white">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Properties Section */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400">
                                        <Clock size={20} />
                                    </div>
                                    <h2 className="text-2xl font-black text-white tracking-tight">Recent Activity</h2>
                                </div>
                                <button
                                    onClick={() => navigate('/properties')}
                                    className="group flex items-center gap-2 text-blue-400 font-bold text-sm hover:text-blue-300 transition-colors"
                                >
                                    View all listings
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {resume.recent_properties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property as unknown as Property}
                                        onViewDetails={(p) => navigate(`/properties/${p.id}`)}
                                    />
                                ))}
                            </div>

                            {resume.recent_properties.length === 0 && (
                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-16 rounded-[2.5rem] text-center space-y-4">
                                    <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 mb-2">
                                        <Home size={48} className="text-blue-400 opacity-50" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">No activity yet</h2>
                                    <p className="text-blue-100/60 max-w-sm mx-auto">Start adding properties to see your dashboard come to life.</p>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
