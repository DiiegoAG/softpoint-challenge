import { useMutation, useQueryClient } from '@tanstack/react-query'
import { propertiesService } from '../services/propertiesService'
import type { CreatePropertyPayload } from '../properties.types'

export const useCreateProperty = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (payload: CreatePropertyPayload) =>
            propertiesService.create(payload),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['properties'],
            })
        },
    })
}
