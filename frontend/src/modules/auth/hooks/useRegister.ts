import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useAuthStore } from '@/stores/useAuthStore'

export const useRegister = () => {
    const { setToken, setUser } = useAuthStore()

    return useMutation({
        mutationFn: authService.register,
        onSuccess: (data) => {
            setToken(data.token)
            setUser(data.user)
        },
    })
}
