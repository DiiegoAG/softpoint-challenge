import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import LoadingButton from '@/components/buttons/LoadingButton'

import { useLogin } from '../hooks/useLogin'
import { Mail, Lock, Eye, EyeOff, Home, ArrowRight } from 'lucide-react';

const LoginPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname || '/'

    const { mutate, isPending, error } = useLogin()

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault()

        mutate(formData, {
            onSuccess: () => {
                navigate(from, { replace: true })
            },
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message || "Error inesperado"
                )
            },
        })
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
            {/* Background with parallax-like effect */}
            <div
                className="absolute inset-0 z-0 scale-105"
                style={{
                    backgroundImage: 'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.6)'
                }}
            />

            {/* Animated Overlay Circles */}
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Main Container */}
            <div className="relative z-10 w-full max-w-md px-6 py-12">
                <div className="backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl space-y-8">

                    {/* Logo & Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-lg mb-4">
                            <Home className="text-white w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-tight">Soft<span className="text-blue-400">Point</span></h1>
                        <p className="text-blue-100/70 font-medium">Properties Management System</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Email Input */}
                            <div className="">
                                <label className="text-sm font-semibold text-blue-100 ml-1">Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-400 text-blue-100/50">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="block w-full pl-10 pr-3 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all backdrop-blur-md"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                                <FormErrors error={error?.response?.data?.errors?.email?.[0]} />
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-semibold text-blue-100">Password</label>
                                    <a href="#" className="text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors">Forgot Password?</a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-400 text-blue-100/50">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="block w-full pl-10 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all backdrop-blur-md"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center bg-transparent text-blue-100/50 hover:text-white transition-colors cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <FormErrors error={error?.response?.data?.errors?.password?.[0]} />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <LoadingButton isPending={isPending} onClick={handleSubmit}>
                            <>
                                <span>Login</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        </LoadingButton>
                    </form>

                    {/* Sign Up Link */}
                    <p className="text-center text-blue-100/60 text-sm">
                        Don't have an account?{' '}
                        <a href="#" className="text-blue-400 font-bold hover:text-blue-300 underline-offset-4 hover:underline transition-all">Register for free</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
