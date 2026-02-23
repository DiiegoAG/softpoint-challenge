import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useAuthStore } from '@/store/useAuthStore'

export const useLogout = () => {
    const logout = useAuthStore((state) => state.logout)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            logout()
            queryClient.clear()
        },
    })
}
