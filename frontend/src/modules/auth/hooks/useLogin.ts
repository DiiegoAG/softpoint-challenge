import { useMutation } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useAuthStore } from '@/stores/useAuthStore'

export const useLogin = () => {
    const { setToken, setUser } = useAuthStore()

    return useMutation({
        mutationFn: authService.login,
        onSuccess: (data) => {
            setToken(data.token)
            setUser(data.user)
        },
    })
}
