/* =========================================
   IMPORTS
========================================= */

import type { RealStateType } from '../properties/properties.types'

export interface DashboardRecentProperty {
    id: number
    name: string

    real_state_type: RealStateType

    street: string
    external_number: string
    internal_number?: string | null

    neighborhood: string
    city: string
    country: string

    rooms: number
    bathrooms: number
    price: number

    comments?: string | null

    user_id: number

    created_at: string
    updated_at: string

    full_address: string
}

export interface DashboardResponse {
    total_properties: number
    average_price: number

    properties_by_type: Record<RealStateType, number>

    recent_properties: DashboardRecentProperty[]
}
