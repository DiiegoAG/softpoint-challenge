import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
            <div
                className="absolute inset-0 z-0 scale-105"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.5)'
                }}
            />

            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 w-full max-w-lg px-6 py-12 text-center">
                <div className="backdrop-blur-xl bg-white/10 p-12 rounded-[2.5rem] border border-white/20 shadow-2xl space-y-8">
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 animate-ping rounded-full bg-blue-400/20 scale-150" />
                            <div className="relative p-6 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl">
                                <Search className="text-white w-12 h-12" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-8xl font-black text-white tracking-tighter">
                            4<span className="text-blue-400">0</span>4
                        </h1>
                        <h2 className="text-3xl font-bold text-white tracking-tight">Property Not Found</h2>
                        <p className="text-blue-100/70 text-lg font-medium max-w-xs mx-auto">
                            The page or property you are looking for has been taken off the market or moved.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Link
                            to="/"
                            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-xl hover:shadow-blue-500/25 transition-all active:scale-[0.98] group"
                        >
                            <Home size={18} />
                            <span>Back to Home</span>
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all active:scale-[0.98]"
                        >
                            <ArrowLeft size={18} />
                            <span>Go Back</span>
                        </button>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <p className="text-xs font-bold text-blue-100/40 uppercase tracking-widest">
                            Soft<span className="text-blue-400/60">Point</span> Systems
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
