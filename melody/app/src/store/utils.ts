import { Tokens } from "@/models/tokens";

const DEFAULT_TOKEN_TYPE = "Bearer";

export function authorizationDefaultHeader(token: string) {
    return {"Authorization": `${DEFAULT_TOKEN_TYPE} ${token}`};
}

export function authorizationAccessHeader(tokens: Tokens) {
    return {"Authorization": `${tokens.tokenType} ${tokens.accessToken}`};
}

export function authorizationRefreshHeader(tokens: Tokens) {
    return {"Authorization": `${tokens.tokenType} ${tokens.refreshToken}`};
}
