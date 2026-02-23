import { useQuery } from '@tanstack/react-query'
import { propertiesService } from '../services/propertiesService'

export const useProperty = (id: number) => {
    return useQuery({
        queryKey: ['properties', id],
        queryFn: () => propertiesService.getById(id),
        enabled: !!id,
    })
}
