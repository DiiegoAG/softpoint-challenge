import { useMutation, useQueryClient } from '@tanstack/react-query'
import { propertiesService } from '../services/propertiesService'
import type { UpdatePropertyPayload } from '../properties.types'

export const useUpdateProperty = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: number
            payload: UpdatePropertyPayload
        }) => propertiesService.update(id, payload),

        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['properties'],
            })

            queryClient.invalidateQueries({
                queryKey: ['properties', data.id],
            })
        },
    })
}
