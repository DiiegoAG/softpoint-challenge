import { useState } from 'react';
import type { SubmitEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import LoadingButton from '@/components/buttons/LoadingButton'
import FormErrors from '@/components/form/FormErrors'
import toast from 'react-hot-toast'

import { useRegister } from '../hooks/useRegister'
import { Mail, Lock, Eye, EyeOff, Home, ArrowRight, User, ShieldCheck } from 'lucide-react';

const RegisterPage = () => {
    const navigate = useNavigate()
    const { mutate, isPending, error } = useRegister()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault()

        mutate(formData, {
            onSuccess: () => {
                toast.success("Account created successfully!")
                navigate('/')
            },
            onError: (error: any) => {
                toast.error(
                    error?.response?.data?.message || "Something went wrong"
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
                    backgroundImage: 'url("https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")',
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
                        <p className="text-blue-100/70 font-medium">Join our Property Management System</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Name Input */}
                            <div className="">
                                <label className="text-sm font-semibold text-blue-100 ml-1">Full Name</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-400 text-blue-100/50">
                                        <User size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="block w-full pl-10 pr-3 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all backdrop-blur-md"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <FormErrors error={error?.response?.data?.errors?.name?.[0]} />
                            </div>

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
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <FormErrors error={error?.response?.data?.errors?.email?.[0]} />
                            </div>

                            {/* Password Input */}
                            <div className="">
                                <label className="text-sm font-semibold text-blue-100 ml-1">Password</label>
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

                            {/* Confirm Password Input */}
                            <div className="">
                                <label className="text-sm font-semibold text-blue-100 ml-1">Confirm Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-blue-400 text-blue-100/50">
                                        <ShieldCheck size={18} />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={formData.password_confirmation}
                                        onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                                        className="block w-full pl-10 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all backdrop-blur-md"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center bg-transparent text-blue-100/50 hover:text-white transition-colors cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <FormErrors error={error?.response?.data?.errors?.password_confirmation?.[0]} />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <LoadingButton isPending={isPending} onClick={handleSubmit}>
                            <>
                                <span>Create Account</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        </LoadingButton>
                    </form>

                    {/* Login Link */}
                    <p className="text-center text-blue-100/60 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-400 font-bold hover:text-blue-300 underline-offset-4 hover:underline transition-all">Log in here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
