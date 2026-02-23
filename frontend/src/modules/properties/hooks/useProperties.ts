import { useQuery } from '@tanstack/react-query'
import { propertiesService } from '../services/propertiesService'

export const useProperties = (page = 1, search = '') => {
    return useQuery({
        queryKey: ['properties', page, search],
        queryFn: () => propertiesService.getAll(page, search),
    })
}
