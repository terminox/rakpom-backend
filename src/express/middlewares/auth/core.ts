export interface TokenDecoder {
  decode(token: string): Promise<AuthPayload>
}

export interface AuthenticationService {
  authenticate(payload: AuthPayload): Promise<AuthenticatedUser>
}

export type AuthPayload = {
  id: string
}

export interface AuthenticatedUser {
  id: string
}