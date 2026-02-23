function DashboardPage() {
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip
} from 'recharts';
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Bienvenido al Dashboard</h1>
            <p className="text-lg text-gray-600">Aquí puedes ver tus datos y estadísticas.</p>

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
        </div>
    );
}

export default DashboardPage;
