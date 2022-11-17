import type {Tokens} from "@/shared/models/entities/tokens.interface";
import type {UserInterface} from "@/shared/models/entities/autenticated-user.interface";

export interface ResLogin {
    tokens: Tokens
    authenticatedUser: UserInterface
}
