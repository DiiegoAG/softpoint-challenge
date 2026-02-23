/* =========================================
   ENUMS
========================================= */

export const REAL_STATE_TYPES = {
    HOUSE: 'house',
    APARTMENT: 'apartment',
    LAND: 'land',
    COMMERCIAL_GROUND: 'commercial_ground',
} as const

export type RealStateType = (typeof REAL_STATE_TYPES)[keyof typeof REAL_STATE_TYPES]


export interface Property {
    id: number

    name: string
    real_state_type: RealStateType

    street: string
    external_number: string
    internal_number?: string | null

    neighborhood: string
    city: string
    country: string // ISO 3166 Alpha-2 (ej: "MX", "US")

    rooms: number
    bathrooms: number | string

    price: number | string

    comments?: string | null

    full_address?: string
    owner?: {
        id: number
        name: string
        email: string
    }

    created_at: string
    updated_at: string
}

export interface CreatePropertyPayload {
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
}

export type UpdatePropertyPayload = Partial<CreatePropertyPayload>

export interface LaravelValidationError {
    message: string
    errors?: Record<string, string[]>
}
