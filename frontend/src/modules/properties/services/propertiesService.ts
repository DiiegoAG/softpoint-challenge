import { api } from '@/lib/axios'

import type {
    Property,
    CreatePropertyPayload,
    UpdatePropertyPayload,
} from '../properties.types'

const apiVersion = 'v1'

export const propertiesService = {

    getAll: async (): Promise<Property[]> => {
        const { data } = await api.get(`${apiVersion}/properties`)
        return data
    },

    getById: async (id: number): Promise<Property> => {
        const { data } = await api.get(`${apiVersion}/properties/${id}`)
        return data
    },

    create: async (
        payload: CreatePropertyPayload
    ): Promise<Property> => {
        const { data } = await api.post(`${apiVersion}/properties`, payload)
        return data
    },

    update: async (
        id: number,
        payload: UpdatePropertyPayload
    ): Promise<Property> => {
        const { data } = await api.put(`${apiVersion}/properties/${id}`, payload)
        return data
    },

    remove: async (id: number): Promise<void> => {
        await api.delete(`${apiVersion}/properties/${id}`)
    },

}
