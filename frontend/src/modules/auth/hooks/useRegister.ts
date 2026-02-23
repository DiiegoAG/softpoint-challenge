import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useAuthStore } from '@/store/useAuthStore'

export const useRegister = () => {
    const setToken = useAuthStore((state) => state.setToken)

    return useMutation({
        mutationFn: authService.register,
        onSuccess: (data) => {
            setToken(data.token)
        },
    })
}
