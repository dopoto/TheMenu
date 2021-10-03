export interface AuthResponse {
    isAuthSuccessful: boolean;
    errorMessage: string;
    token: string;
    refreshToken: string;
    provider: string;
}