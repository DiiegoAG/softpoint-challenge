import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '../services/dashboardService'

export const useDashboard = () => {
    return useQuery({
        queryKey: ['dashboard-resume'],
        queryFn: dashboardService.getResume,
    })
}
