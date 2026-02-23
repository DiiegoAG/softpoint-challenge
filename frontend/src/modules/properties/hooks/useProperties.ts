import { useQuery } from '@tanstack/react-query'
import { propertiesService } from '../services/propertiesService'

export const useProperties = () => {
    return useQuery({
        queryKey: ['properties'],
        queryFn: propertiesService.getAll,
    })
}
