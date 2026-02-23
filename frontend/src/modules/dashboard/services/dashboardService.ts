import { api } from '@/lib/axios'

import type {
    DashboardResponse,
    DashboardRecentProperty,
} from '../dashboard.types'

const apiVersion = 'v1'

export const dashboardService = {

    getResume: async (): Promise<DashboardResponse> => {
        const { data } = await api.get(`${apiVersion}/dashboard`)

        return {
            ...data,

            recent_properties: data.recent_properties.map(
                (property: DashboardRecentProperty) => ({
                    ...property,
                    bathrooms: Number(property.bathrooms),
                    price: Number(property.price),
                })
            ),
        }
    },

}
