import { api } from '@/lib/axios'

import type {
    AuthResponse,
    LoginPayload,
    RegisterPayload,
    User,
} from '../auth.types'

export const authService = {
    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        const { data } = await api.post('/auth/register', payload)
        return data
    },

    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        const { data } = await api.post('/auth/login', payload)
        return data
    },

    logout: async (): Promise<void> => {
        await api.post('/auth/logout')
    },

    me: async (): Promise<User> => {
        const { data } = await api.get('/auth/me')
        return data
    },
}
