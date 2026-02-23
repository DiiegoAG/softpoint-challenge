import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../services/authService'
import { useAuthStore } from '@/stores/useAuthStore'

export const useLogout = () => {
    const logout = useAuthStore((state) => state.logout)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: authService.logout,
        onSettled: () => {
            logout()
            queryClient.clear()
        },
    })
}
