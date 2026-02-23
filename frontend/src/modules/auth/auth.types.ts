export interface User {
    name: string
    email: string
}

export interface AuthResponse {
    user: User
    token: string
}

export interface LoginPayload {
    email: string
    password: string
}

export interface RegisterPayload {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface LaravelValidationError {
    message: string
    errors?: Record<string, string[]>
}
