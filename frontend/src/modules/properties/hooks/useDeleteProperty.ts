import { useMutation, useQueryClient } from '@tanstack/react-query'
import { propertiesService } from '../services/propertiesService'

export const useDeleteProperty = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: number) => propertiesService.remove(id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['properties'],
            })
        },
    })
}
