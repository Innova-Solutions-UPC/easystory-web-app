export interface LoginForm {
    email: string;
    password: string;
    rememberMe?: boolean;
    token?: string;
}

export interface ResLogin {
    tokens: Tokens
    authenticatedUser: AuthenticatedUser
}
export interface ResProfile {
    id: number
    username: string
    email: string
    verified: boolean
    createdAt: string
    updatedAt: string
}

export interface Tokens {
    accessToken: string
}

export interface AuthenticatedUser {
    id: number
    username: string
    email: string
    verified: boolean
    createdAt: string
    updatedAt: string
}

