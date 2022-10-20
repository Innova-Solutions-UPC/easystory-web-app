import type {Tokens} from "@/shared/models/entities/tokens.interface";
import type {AuthenticatedUser} from "@/shared/models/entities/autenticated-user.interface";

export interface ResLogin {
    tokens: Tokens
    authenticatedUser: AuthenticatedUser
}
