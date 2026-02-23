
interface LoadingButtonProps {
    isPending: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    className?: string;
}

const LoadingButton = ({
    isPending,
    onClick,
    children,
    type = 'submit',
    className = ""
}: LoadingButtonProps) => {
    return (
        <button type={type} disabled={isPending} onClick={onClick}
            className={`relative w-full cursor-pointer overflow-hidden group py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-xl hover:shadow-blue-500/25 transition-all active:scale-[0.98] disabled:opacity-50 ${className}`}
        >
            <div className="relative flex items-center justify-center gap-2">
                {isPending ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    children
                )}
            </div>
        </button>
    )
}

export default LoadingButton
